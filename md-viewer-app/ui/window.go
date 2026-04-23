package ui

import (
	"md-viewer-app/core"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/driver/desktop"
)

// Run starts the application
func Run() {
	a := app.NewWithID("com.mdviewer.app")
	a.Settings().SetTheme(&mdViewerTheme{})

	w := a.NewWindow("md-viewer")
	w.Resize(fyne.NewSize(900, 600))

	// Create components
	sidebar := newSidebar()
	preview := newPreview()
	defer preview.close()

	// Wire sidebar selection to preview
	sidebar.onSelect = func(path string) {
		content, err := core.ReadFile(path)
		if err != nil {
			preview.show("⚠️ 讀取失敗: "+err.Error(), path)
			return
		}
		preview.show(content, path)
		w.SetTitle("md-viewer — " + core.BaseName(path))
	}

	// Layout: sidebar + preview
	split := container.NewHSplit(sidebar.widget(), preview.widget())
	split.SetOffset(0.25)

	w.SetContent(split)

	// Menu bar
	setupMenu(a, w, sidebar, preview)

	w.SetCloseIntercept(func() {
		preview.close()
		w.Close()
	})

	w.ShowAndRun()
}

// setupMenu configures the application menu bar
func setupMenu(a fyne.App, w fyne.Window, sidebar *sidebarCtrl, preview *previewCtrl) {
	openFileItem := fyne.NewMenuItem("開啟檔案...", func() {
		dialog.ShowFileOpen(func(reader fyne.URIReadCloser, err error) {
			if err != nil || reader == nil {
				return
			}
			path := reader.URI().Path()
			reader.Close()

			content, err := core.ReadFile(path)
			if err != nil {
				preview.show("⚠️ 讀取失敗: "+err.Error(), path)
				return
			}
			preview.show(content, path)
			w.SetTitle("md-viewer — " + core.BaseName(path))
		}, w)
	})

	openFolderItem := fyne.NewMenuItem("開啟資料夾...", func() {
		dialog.ShowFolderOpen(func(lister fyne.ListableURI, err error) {
			if err != nil || lister == nil {
				return
			}
			sidebar.loadDirectory(lister.String())
		}, w)
	})

	toggleSidebarItem := fyne.NewMenuItem("切換側邊欄", func() {
		sidebar.toggle()
	})

	refreshItem := fyne.NewMenuItem("重新整理預覽", func() {
		path := sidebar.selectedPath()
		if path != "" && sidebar.onSelect != nil {
			sidebar.onSelect(path)
		}
	})

	fileMenu := fyne.NewMenu("檔案", openFileItem, openFolderItem)
	viewMenu := fyne.NewMenu("顯示", toggleSidebarItem, refreshItem)
	aboutItem := fyne.NewMenuItem("關於 md-viewer", func() {
		dialog.ShowInformation("關於 md-viewer",
			"md-viewer v0.2.0\n\n純閱讀導向的 Markdown 預覽器\n\n✅ GFM 語法支援：表格、任務清單、刪除線\n✅ 程式碼區塊\n✅ 深色模式\n✅ 自動重整\n\nBuilt with Go + goldmark + Fyne",
			w)
	})
	helpMenu := fyne.NewMenu("說明", aboutItem)

	w.SetMainMenu(fyne.NewMainMenu(fileMenu, viewMenu, helpMenu))

	// Register keyboard shortcuts (desktop only)
	canvas := w.Canvas()
	if canvas != nil {
		canvas.AddShortcut(&desktop.CustomShortcut{
			KeyName:  fyne.KeyO,
			Modifier: fyne.KeyModifierSuper,
		}, func(_ fyne.Shortcut) {
			openFileItem.Action()
		})
		canvas.AddShortcut(&desktop.CustomShortcut{
			KeyName:  fyne.KeyO,
			Modifier: fyne.KeyModifierSuper | fyne.KeyModifierShift,
		}, func(_ fyne.Shortcut) {
			openFolderItem.Action()
		})
		canvas.AddShortcut(&desktop.CustomShortcut{
			KeyName:  fyne.KeyB,
			Modifier: fyne.KeyModifierSuper,
		}, func(_ fyne.Shortcut) {
			sidebar.toggle()
		})
		canvas.AddShortcut(&desktop.CustomShortcut{
			KeyName:  fyne.KeyR,
			Modifier: fyne.KeyModifierSuper,
		}, func(_ fyne.Shortcut) {
			refreshItem.Action()
		})
	}
}

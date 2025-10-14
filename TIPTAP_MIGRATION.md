# React-Quill 遷移至 Tiptap 編輯器

## 更新概要

本次更新將 Blog 後台的編輯器從 `react-quill` 遷移至 `@tiptap/react`，提供更現代化、可擴展的富文本編輯體驗。

## 主要變更

### 前端 (Ecommerce-web)

#### 1. 新增套件
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header
```

#### 2. 移除套件
```bash
npm uninstall react-quill
```

#### 3. 新建檔案

**TiptapEditor 組件** (`src/components/TiptapEditor/index.tsx`)
- 主要的 Tiptap 編輯器包裝組件
- 支援多種擴展功能：標題、對齊、粗體、斜體、底線、顏色、連結、圖片、表格等
- 提供 `minimal` 模式用於簡化介面

**MenuBar 組件** (`src/components/TiptapEditor/MenuBar.tsx`)
- 編輯器工具列
- 提供文字格式化、對齊、列表、引用、連結等功能按鈕

**Tiptap 樣式** (`src/styles/tiptap.css`)
- 編輯器的 CSS 樣式
- 包含內容區域樣式、工具列樣式、最小化模式樣式

#### 4. 修改檔案

**TagElement.tsx** (`src/components/CustomPage/NestedDisplayUI/src/TagElement.tsx`)
- 移除 `ReactQuill` 動態引入
- 改用 `TiptapEditor` 組件
- 保持相同的編輯與顯示邏輯

**items.tsx** (`src/components/CustomPage/NestedDisplayUI/src/items.tsx`)
- 移除 `ReactQuill` 動態引入
- 改用 `TiptapEditor` 組件
- 新增 `handleItemChange` 函數優化資料更新
- 根據元素類型決定是否使用 minimal 模式

**TableElement.tsx** (`src/components/CustomPage/NestedDisplayUI/src/TableElement.tsx`)
- 移除 `ReactQuill` 動態引入
- 改用 `TiptapEditor` 組件
- 表格單元格編輯使用 minimal 模式

**_app.tsx** (`src/pages/_app.tsx`)
- 新增 Tiptap CSS 樣式引入：`import '@styles/tiptap.css';`

**globals.scss** (`src/styles/globals.scss`)
- 移除 `@import 'components/react-quill';` 引入

**_react-quill.scss** (`src/styles/components/_react-quill.scss`)
- 已刪除此檔案

### 後端 (Ecommerce-api2023)

#### 修改檔案

**blocks.ts** (`models/Blocks/blocks.ts`)
- 更新 `IElement` 介面註解
- 明確說明 `context` 欄位支援 HTML 格式（由 Tiptap 產生）
- 現有的 Schema 結構完全兼容，無需修改資料庫

## Tiptap 編輯器功能

### 支援的格式化選項
- **文字樣式**: 粗體、斜體、底線、刪除線、程式碼
- **標題**: H1 - H6
- **列表**: 項目符號列表、數字列表
- **對齊**: 左對齊、置中、右對齊
- **區塊元素**: 引用區塊、連結
- **進階功能**: 圖片、表格（可調整大小）
- **歷史記錄**: 撤銷、重做

### 使用方式

```tsx
import TiptapEditor from '@components/TiptapEditor';

// 基本用法
<TiptapEditor
  content={htmlContent}
  onChange={(html) => setContent(html)}
  onBlur={handleSave}
  placeholder="請輸入內容"
/>

// 最小化模式（適用於單行或簡單編輯）
<TiptapEditor
  content={htmlContent}
  onChange={(html) => setContent(html)}
  minimal={true}
  className="custom-class"
/>
```

### Props 說明

| Prop | 類型 | 必填 | 說明 |
|------|------|------|------|
| content | string | 是 | HTML 格式的內容 |
| onChange | (html: string) => void | 是 | 內容變更回調函數 |
| onBlur | () => void | 否 | 失去焦點時的回調函數 |
| placeholder | string | 否 | 佔位符文字，預設為 "請輸入內容" |
| minimal | boolean | 否 | 是否使用最小化模式（隱藏工具列），預設為 false |
| className | string | 否 | 自定義 CSS 類名 |

## 資料格式

### 儲存格式
Tiptap 輸出標準的 HTML 格式，與 react-quill 完全兼容：

```html
<h1>標題</h1>
<p>這是一段<strong>粗體</strong>文字。</p>
<ul>
  <li>列表項目 1</li>
  <li>列表項目 2</li>
</ul>
```

### 相容性
- 舊有的 react-quill 資料可以直接在 Tiptap 中顯示和編輯
- 無需進行資料遷移
- 後端 Schema 保持不變

## 優勢

1. **現代化**: Tiptap 基於 ProseMirror，是目前最先進的富文本編輯器框架
2. **擴展性強**: 模組化設計，可輕鬆新增自定義功能
3. **TypeScript 支援**: 完整的型別定義
4. **效能優化**: 虛擬 DOM 渲染，適合大型文檔
5. **主動維護**: 活躍的社群和持續的更新
6. **無 jQuery 依賴**: 更輕量，更符合現代 React 開發

## 使用 Tiptap 的組件

以下組件已自動使用 Tiptap 編輯器（透過 NestedDisplayUI）：

1. **ProductCustomBlocks** (`src/components/Form/FormCRUD/ProductCustomBlocks.tsx`)
   - 產品詳細描述區塊編輯
   - 支援拖拽排序、圖片上傳

2. **NewsCustomBlocks** (`src/components/Layout/AdminLayout/NewsManagement/NewsBlocks/index.tsx`)
   - 新聞內容區塊編輯
   - 支援動態新增/刪除區塊

3. **ArticleCustomBlocks** (`src/components/Layout/AdminLayout/ArticleManagement/ArticleCustomBlocks/index.tsx`)
   - 文章內容區塊編輯
   - 完整的區塊編輯功能

這些組件都使用 `NestedDisplayUI` 渲染區塊，而 `NestedDisplayUI` 內部已經使用 Tiptap 替換了原本的 react-quill，因此無需修改這些檔案。

## 注意事項

1. Tiptap 需要在客戶端渲染，已在組件中處理
2. 樣式檔案 `tiptap.css` 必須在 `_app.tsx` 中引入
3. 編輯器工具列預設為粘性定位（sticky），適合長文編輯
4. 最小化模式適合表格單元格或簡短內容編輯
5. 所有使用 `NestedDisplayUI` 的組件都會自動使用 Tiptap 編輯器

## 測試建議

1. 測試舊有文章的顯示和編輯
2. 測試新建文章的各種格式化功能
3. 測試表格編輯功能
4. 測試項目列表編輯功能
5. 確認在不同瀏覽器的兼容性

## 回滾方案

如需回滾到 react-quill：

```bash
# 重新安裝 react-quill
npm install react-quill

# 從 git 歷史還原以下檔案
git checkout HEAD~1 -- src/components/CustomPage/NestedDisplayUI/src/TagElement.tsx
git checkout HEAD~1 -- src/components/CustomPage/NestedDisplayUI/src/items.tsx
git checkout HEAD~1 -- src/components/CustomPage/NestedDisplayUI/src/TableElement.tsx
git checkout HEAD~1 -- src/pages/_app.tsx

# 刪除 Tiptap 組件
rm -rf src/components/TiptapEditor
rm src/styles/tiptap.css

# 卸載 Tiptap 套件
npm uninstall @tiptap/react @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header
```

## 技術支援

如遇問題，請參考：
- [Tiptap 官方文檔](https://tiptap.dev/)
- [Tiptap GitHub](https://github.com/ueberdosis/tiptap)

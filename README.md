# Todo List

使用 Node.js/Express.js 及 Express-Handlebars 建立的 Todo List

## Features - 產品功能

- 使用者可以建立帳號並登入以建立自己的 Todo List
- 使用者可以使用 Facebook 帳號登入
- 使用者可以**新增**Todo
- 使用者可以**修改**Todo
- 使用者可以**刪除**Todo

## Prerequisites - 環境建置與需求

- node.js v14.17.1
- express v4.18.2
- express-handlebars v6.0.6
- mongoose v6.7.2
- mongodb v4.2.14
- bcryptjs ^2.4.3
- connect-flash v0.1.1
- dotenv v16.0.3
- passport v0.6.0
- passport-facebook v3.0.0
- passport-local v1.0.0

## Installing - 安裝流程

1. 開啟終端機(Terminal)將此專案 Clone 至本機電腦

```
git clone https://github.com/steven4program/todo_list.git
```

2. 進入存放此專案的資料夾

```
cd todo_list
```

3. 安裝 npm 套件

```
npm install
```

4. 加入種子資料

```
將.env.example檔案更名為.env
```

5. 加入種子資料

```
npm run seed
```

6. 啟動網頁伺服器

```
npm run dev
```

當 Terminal 出現以下文字表示成功連結本地伺服器

```
App is running on http://localhost/3000; press Ctrl-C to terminate.
```

7. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案

## Testing - 測試帳號

```
name: root
email: root@example.com
password: 12345678
```

## Developer - 開發者

[Steven Chang](https://github.com/steven4program)

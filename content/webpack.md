---
slug: webpack
title: Tìm hiểu về webpack
category: Frontend Development
description: "Tìm hiểu webpack, cách hoạt động của webpack"
img: webpack.jpg
date: 06 September 2025
author: thiennt
---

## Khái niệm webpack là gì ?

Webpack là một module bundler (trình đóng gói module) cho ứng dụng JavaScript. Nó nhận toàn bộ code (JS, CSS, ảnh, font, …), xử lý (compile, optimize) và bundle thành một (hoặc vài) file để chạy trên trình duyệt.

## Vòng đời của webpack

### 1. Entry: webpack bắt đầu bằng từ file entry point

```
module.exports = {
  entry: "./src/index.js",
};
```

### 2. Modules & Loaders

- Mỗi file (JS, CSS, ảnh, …) đều là một module.
- Loaders giúp Webpack hiểu cách xử lý file không phải JS gốc.
  - babel-loader: chuyển ES6/JSX → ES5.
  - css-loader: cho phép import file CSS vào JS.
  - file-loader / asset: xử lý ảnh, font.

```
module: {
  rules: [
    { test: /\.js$/, use: "babel-loader" },
    { test: /\.css$/, use: ["style-loader", "css-loader"] },
    { test: /\.(png|jpg)$/, type: "asset/resource" },
  ],
}
```

### 3. Plugins

- Mở rộng sức mạnh Webpack.
- Ví dụ:
  - HtmlWebpackPlugin: tự động chèn bundle vào file HTML.
  - MiniCssExtractPlugin: tách CSS ra file riêng.
  - DefinePlugin: khai báo biến môi trường.

```
plugins: [
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
  new MiniCssExtractPlugin(),
];
```

### 4. Output: Kết quả cuối cùng (thường là bundle.js) nằm trong thư mục dist/.

```
output: {
  filename: "bundle.js",
  path: path.resolve(__dirname, "dist"),
  clean: true, // xoá file cũ mỗi lần build
}
```

### Ví dụ cho 1 file webpack

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // đổi thành "production" khi build thật

  entry: "./src/index.js", // điểm vào
  output: {
    path: path.resolve(__dirname, "dist"), // thư mục output
    filename: "bundle.[contenthash].js",   // file JS sau build
    clean: true, // xoá dist cũ trước khi build mới
    publicPath: "/", // để hỗ trợ react-router
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // cho phép import .js và .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // dùng babel để transpile
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
          },
        },
      },
      {
        test: /\.css$/, // xử lý file CSS
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // xử lý ảnh
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"], // import không cần ghi .jsx
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // template html
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true, // để React Router không bị lỗi
    hot: true,
    open: true, // tự mở browser
  },
};
```

**Chú ý:**

- mode:
  - "development" → debug dễ, có sourcemap.
  - "production" → tối ưu, minify, tree-shaking.
- output:
  - clean: true => mỗi lần build sẽ xoá dist/ cũ.
  - filename: tên file bundle, dùng [contenthash] để tránh cache lỗi thời
  - publicPath: "/": quan trọng khi dùng React Router (đảm bảo load đúng file khi refresh)
- JS/JSX (babel-loader):
  - @babel/preset-env: chuyển ES6+ → ES5.
  - @babel/preset-react: dịch JSX → JS.
- CSS loader:
  - css-loader: cho phép import "./style.css".
  - MiniCssExtractPlugin.loader: tách CSS ra file riêng.
- Asset (ảnh, SVG, …):
  - type: "asset/resource" → copy ảnh vào dist/ và trả về URL.
- HtmlWebpackPlugin: tạo file index.html từ template trong public/index.html và tự động nhúng `<script src="bundle.js">`.
- MiniCssExtractPlugin: tạo file CSS riêng với tên [name].[contenthash].css để chống cache.

```
devServer: {
  port: 3000,
  historyApiFallback: true,
  hot: true,
  open: true,
},
```

- port: 3000: chạy ở localhost:3000.
- historyApiFallback: true: quan trọng khi dùng React Router → cho phép reload mà không bị 404.
- hot: true: bật Hot Module Replacement (HMR) → update code mà không reload trang.
- open: true: tự mở browser sau khi start.

**File trên sẽ chạy như sau:**

1. Webpack bắt đầu từ entry: ./src/index.js.
2. File JS/JSX được xử lý qua babel-loader để dịch sang ES5.
3. CSS được xử lý bằng css-loader + MiniCssExtractPlugin.
4. Ảnh được xử lý bằng asset/resource.
5. Kết quả build ra file dist/ gồm:

- bundle.[hash].js
- style.[hash].css
- index.html (HtmlWebpackPlugin tạo).

6. DevServer phục vụ app ở http://localhost:3000/.

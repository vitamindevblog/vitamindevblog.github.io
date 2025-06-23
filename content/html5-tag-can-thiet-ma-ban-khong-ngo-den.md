---
slug: html5-tag-can-thiet-ma-ban-khong-ngo-den
title: Các thẻ HTML5 cần thiết mà bạn không ngờ đến?
category: HTML
description: "Đây không chỉ là những thẻ HTML bình thường. Hãy cùng khám phá những thẻ HTML mạnh mẽ đến bất ngờ mà có thể bạn chưa từng sử dụng — nhưng chắc chắn nên dùng."
img: html5-tag.jpg
date: 23 June 2025
author: thiennt
---

## 1. Thẻ `<detail>` và `<sumary>`: Accordion tích hợp sẵn

Accordion (nội dung thu gọn/mở rộng) xuất hiện ở khắp nơi trên web — trang FAQ, chi tiết sản phẩm, bảng cài đặt ... Hầu hết lập trình viên sẽ tìm đến một giải pháp JavaScript, nhưng HTML5 lại có sẵn cặp thẻ này:

```
<details>
  <summary>Click to expand</summary>
  <p>This content can be expanded and collapsed without any JavaScript!</p>
</details>
```

Chỉ cần vậy là đủ. Trình duyệt sẽ tự động xử lý hành vi mở/đóng, các thuộc tính hỗ trợ tiếp cận (accessibility), và điều hướng bằng bàn phím.

Bạn cũng có thể tùy biến giao diện để phù hợp với hệ thiết kế của mình:

```
details > summary {
  list-style: none; /* Removes the default triangle */
}

details > summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5em;
  transition: transform 0.2s;
}

details[open] > summary::before {
  transform: rotate(90deg);
}
```

Những thẻ này đặc biệt hữu ích trong điều hướng phân cấp. Tôi từng dùng nó trong một trang tài liệu kỹ thuật có ba cấp điều hướng:

```
<details>
  <summary>Programming Languages</summary>
  <details>
    <summary>Frontend</summary>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </details>
  <details>
    <summary>Backend</summary>
    <ul>
      <li>Java</li>
      <li>PHP</li>
      <li>.NET</li>
    </ul>
  </details>
</details>
```

Giới hạn duy nhất là animation — nếu bạn muốn hiệu ứng mở/đóng mượt mà, bạn cần thêm JavaScript. Nhưng với nhiều trường hợp, chỉ cần mặc định vậy đã đủ tốt.

## 2. Thẻ `<datalist>`: auto-complete

Chức năng auto-complete là một chức năng chính của các biểu mẫu web hiện đại. Hầu hết các nhà phát triển đều tìm đến giải pháp của bên thứ ba, nhưng HTML5 có một thành phần tích hợp cho việc này:

```
<input list="browsers" name="browser" placeholder="Choose a browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>
```

Tính năng này cung cấp cho bạn nhập văn bản và hiển thị các gợi ý khi bạn nhập.

Một trường hợp sử dụng thú vị là tạo bộ chọn màu với các màu được đặt tên:

```
<input type="text" list="colors" placeholder="Choose a color">
<datalist id="colors">
  <option value="#FF0000">Red</option>
  <option value="#00FF00">Green</option>
  <option value="#0000FF">Blue</option>
</datalist>
```

Người dùng có thể nhập tên màu hoặc mã hex. Thêm một chút JavaScript để hiển thị bản xem trước:

```
const input = document.querySelector('input');
const preview = document.getElementById('colorPreview');

input.addEventListener('input', () => {
  preview.style.backgroundColor = input.value;
});
```

Hạn chế chính của thẻ <datalist> là style - bạn không thể dễ dàng tùy chỉnh giao diện của các tùy chọn thả xuống. Nếu bạn cần tùy chỉnh cho các gợi ý, bạn vẫn cần giải pháp JavaScript.

## 3. Thẻ `<metter>`: Hiển thị phép đo

Khi hiển thị các giá trị trong phạm vi đã biết, hầu hết các nhà phát triển sử dụng div có màu nền. Nhưng HTML5 có một phần tử chuyên dụng cho việc này:

```
<meter value="75" min="0" max="100" low="30" high="70" optimum="80"></meter>
```

Trình duyệt sẽ định dạng nó dựa trên ngưỡng bạn đặt. Nếu giá trị nằm trong phạm vi "low", nó có thể hiển thị màu vàng. Nếu nằm trong phạm vi "high", nó có thể hiển thị màu cam. Và nếu gần giá trị "optimum", nó sẽ hiển thị màu xanh lá cây.

Điều này đặc biệt hữu ích cho bảng thông tin:

```
<!-- Disk usage (lower is better) -->
<meter value="75" min="0" max="100" low="70" high="90" optimum="0">75%</meter>

<!-- Battery level (higher is better) -->
<meter value="35" min="0" max="100" low="20" high="60" optimum="100">35%</meter>

<!-- CPU usage (lower is better) -->
<meter value="82" min="0" max="100" low="60" high="80" optimum="0">82%</meter>
```

Thuộc tính optimum này cho biết giá trị cao hơn hay thấp hơn thì tốt hơn, ảnh hưởng đến màu sắc.

## 5. Thẻ `<output>`: Hiển thị kết quả tính toán

Bạn từng thấy những form với giá trị được tính toán theo thời gian thực? Nhiều người sẽ chọn JavaScript + span để hiển thị, nhưng HTML5 cung cấp một giải pháp semantic hơn:

```
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="0"> +
  <input type="number" id="b" value="0"> =
  <output name="result" for="a b">0</output>
</form>
```

Thẻ <output> giúp bạn truyền đạt rõ ràng rằng đây là kết quả được tính từ đầu vào. Nó có thể tích hợp tốt với form, giúp cải thiện khả năng tiếp cận (accessibility) và rõ ràng về mặt cấu trúc.

## 6. Thẻ `<time>`: Hiển thị và phân tích ngày giờ

Thẻ này có thể trông như vô dụng, nhưng lại cực kỳ hữu ích cho SEO và công cụ tìm kiếm, giúp chúng hiểu được thời gian cụ thể mà bạn hiển thị:

```
<p>The article was published on <time datetime="2025-05-23">May 23, 2025</time>.</p>
```

Google và các công cụ khác có thể phân tích (machine-readable) định dạng datetime, trong khi người dùng vẫn thấy định dạng mà họ muốn thấy.

Bạn cũng có thể dùng nó cho thời lượng:

```
<!-- Just a date -->
<time datetime="2025-05-20">May 20, 2025</time>

<!-- Date and time -->
<time datetime="2025-05-20T14:30:00">2:30 PM on May 20, 2025</time>

<!-- Just a time -->
<time datetime="14:30:00">2:30 PM</time>

<!-- A duration -->
<time datetime="PT2H30M">2 hours and 30 minutes</time>
```

Thẻ này đặc biệt có giá trị đối với các blog, trang tin tức và nền tảng truyền thông xã hội, nơi thông tin ngày giờ chính xác là rất quan trọng.

## 7. Các thành phần `<figure>` và `<figcaption>`: Chú thích hình ảnh ngữ nghĩa

Hầu hết các lập trình viên triển khai chú thích hình ảnh bằng `div` và `p`, nhưng HTML5 có các thành phần chuyên dụng cho việc này:

```
<figure>
  <img src="chart.jpg" alt="Sales chart for Q2 2025">
  <figcaption>Fig.1 - Company sales increased by 25% in Q2 2025.</figcaption>
</figure>
```

Phần tử `<figure>` này không chỉ dành cho hình ảnh - nó có thể được sử dụng cho bất kỳ nội dung nào được tham chiếu như một đơn vị duy nhất:

```
<!-- Code snippet with caption -->
<figure>
  <pre><code>
  function greet(name) {
    return `Hello, ${name}!`;
  }
  </code></pre>
  <figcaption>A simple JavaScript greeting function using template literals.</figcaption>
</figure>

<!-- Quote with attribution -->
<figure>
  <blockquote>
    <p>The best way to predict the future is to invent it.</p>
  </blockquote>
  <figcaption>— Alan Kay</figcaption>
</figure>
```

Các yếu tố này đặc biệt hữu ích cho các hệ thống quản lý nội dung và blog, nơi cần thêm chú thích vào hình ảnh và các phương tiện truyền thông khác.

Một thiết lập CSS đơn giản có thể tạo ra một thư viện đẹp mắt:

```
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

figure {
  margin: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

figure:hover {
  transform: translateY(-5px);
}

figure img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

figcaption {
  padding: 10px;
  background-color: #f5f5f5;
  font-style: italic;
}
```

## <i>Các thành phần này làm giảm sự phụ thuộc vào JavaScript, cải thiện khả năng truy cập và làm cho HTML của bạn có ý nghĩa và ngữ nghĩa hơn.</i>

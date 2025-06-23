---
slug: currying-in-js
title: Currying Function trong Javascript?
category: Javascript
description: "Bí ẩn của Currying Function trong JavaScript!"
img: currying-js.jpg
date: 23 June 2025
author: thiennt
---

## Currying — nghe như thể một thứ gì đó phức tạp. Nhưng thật ra, đây là một khái niệm nhỏ trong JavaScript rất hữu ích và thú vị khi bạn đã hiểu rõ cách hoạt động của nó!

### Currying là gì?

Thông thường, bạn viết một hàm như thế này:

```
function add(a, b) {
  return a + b;
}

add(2, 3); // 5
```

Currying cho phép bạn chia nhỏ hàm đó — thay vì truyền tất cả tham số cùng lúc, bạn truyền từng tham số một:

```
function add(a) {
  return function(b) {
    return a + b;
  };
}

add(2)(3); // 5
```

add(2) trả về một hàm mới đang chờ tham số b. Khi bạn truyền 3, phép cộng được thực thi!

<b>Nói đơn giản: Currying là quá trình chuyển đổi một hàm nhận nhiều đối số thành chuỗi các hàm, mỗi hàm nhận một đối số.</b>

### Tại sao lại làm vậy? Tại sao phải chia nhỏ việc truyền đối số?

Vấn đề là: Currying giúp bạn kiểm soát tốt hơn, đặc biệt khi bạn muốn tái sử dụng hàm với một số giá trị cố định sẵn.
Ví dụ: bạn muốn tạo một hàm luôn nhân đôi một số:

```
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
console.log(double(10)); // 20
```

Thay vì viết multiply(2, x) nhiều lần, bạn đã có một hàm double() tiện dụng. Gọn gàng và hữu ích!

### Dưới đây là cách tạo một hàm curry để xử lý nhiều đối số, từng bước một:

```
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}
```

Cách dùng:

```
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));     // 6
console.log(curriedSum(1, 2)(3));     // 6
console.log(curriedSum(1)(2, 3));     // 6
```

### Ví dụ sát thực tế

```
function greet(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greet("Hello");
console.log(sayHello("Sudhil")); // Hello, Sudhil!
console.log(sayHello("Raj"));   // Hello, Raj!
```

### So sánh currying và partial function

- Currying: chuyển hàm nhiều tham số thành chuỗi các hàm, mỗi hàm nhận một tham số.
- Partial Application: gán trước một số đối số, hàm kết quả vẫn có thể nhận nhiều đối số khác.

### Khi nào nên dùng currying ?

Hãy dùng currying khi nó làm cho mã nguồn của bạn sạch hơn, tái sử dụng tốt hơn, dễ hiểu hơn. Trong các dự án nhóm, điều quan trọng là mọi người đều hiểu được bạn đang làm gì.

## Tổng kết

- Currying chia nhỏ hàm nhiều tham số thành chuỗi hàm nhận từng tham số một.
- Giúp bạn tạo logic tùy chỉnh và tái sử dụng dễ dàng.
- Không cần dùng ở mọi nơi — chỉ dùng khi thực sự hợp lý.

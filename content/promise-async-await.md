---
slug: promise-async-await
title: Promise, Async Await trong Javascript?
category: Javascript
description: "Tìm hiểu đào sâu Promise, Async Await trong JavaScript!"
img: promise-async-await.jpg
date: 2 December 2025
author: thiennt
---

## Promise trong javascript là gì ?

#### Promise được sinh ra ở phiên bản ES6 (ECMAScript 2015). Promise sinh ra để giải quyết bài toán “callback hell” (callback lồng nhau) và giúp việc xử lý bất đồng bộ (asynchronous) trong JavaScript trở nên dễ đọc, dễ quản lý và dễ bắt lỗi hơn.

#### Promise: là một cơ chế để xử lý các hoạt động bất đồng bộ. đại diện cho một giá trị ở thời điểm hiện tại có thể chưa tồn tại, nhưng sẽ được xử lý và có giá trị vào một thời gian nào đó trong tương lai.

#### Một promise có thể tồn tại ở một trong 3 trạng thái:

- Pending (Đang chờ): Trạng thái ban đầu.
- Fulfilled (Hoàn thành) hoặc Resolved (Được giải quyết): Thao tác đã hoàn thành thành công.
- Rejected (Bị từ chối): Thao tác đã thất bại.

#### Promise method

- **_Promise.all()_**: nhận vào một mảng các promise và trả về 1 promise mới. Promise mới này được resolve khi tất cả các promise trong mảng được resolve và kết quả của nó là mảng kết quả của các promise đó. reject khi một promise trong mảng bị reject và trả về reason của promise đầu tiên bị reject
- **_Promise.allSettled()_**: nhận vào một mảng các promise và trả về 1 promise mới. Promise này sẽ resolve với một mảng các object, mỗi object tượng trưng cho kết quả của một promise đầu vào kể cả promise có resolve or reject.
- **_Promise.any()_**: nhận vào 1 mảng các promise và trả về 1 promise mới. Promise được trả về này sẽ resolve khi ít nhất một promise trong iterable resolve thành công, và giá trị trả về sẽ là giá trị resolve của promise đầu tiên resolve thành công.Nếu tất cả các promise đều reject, Promise.any() sẽ cũng reject và trả về reason của promise cuối cùng bị reject.
- **_Promise.race()_** : nhận vào 1 mảng các promise và trả về 1 promise mới.Promise được trả về này sẽ resolve khi ít nhất một promise trong iterable resolve hoặc reject. Giá trị trả về sẽ là giá trị resolve của promise đầu tiên resolve hoặc reason của promise đầu tiên reject.

## Async/await trong javascript là gì ?

#### Async/await được sinh ra ở phiên bản ES8(ECMAScript 2017). Async/await ra đời để đơn giản hóa cách viết code bất đồng bộ, giúp nó rõ ràng, dễ đọc và dễ quản lý hơn Promise thuần hoặc callback.

#### Async/await là hàm được khai báo với từ khóa async và sẽ luôn trả về một promise. Khi gọi hàm async , bạn sử dụng await bên trong hàm để chờ 1 promise được giải quyết hoặc từ chối, trước khi thực hiện các dòng lệnh tiếp theo. Hàm làm cho code bất đồng bộ trong giống như đồng bộ, dễ đọc , dễ bảo trì hơn. Async / Await được thực hiện tuần tự , không phải song song.

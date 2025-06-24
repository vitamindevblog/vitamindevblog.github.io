---
slug: react-query
title: Sức mạnh của React Query?
category: Reactjs
description: "Fetching và caching data trong dự án reactjs ?"
img: react-query.jpg
date: 24 June 2025
author: thiennt
---

#### React query được sinh ra để giải quyết vấn đề cache dữ liệu. Với ví dụ dễ hiểu là với một trang danh sách đã lấy dữ liệu một lần rồi, lúc nhảy sang một trang bất kỳ khác và quay lại thì lại gọi hàm fetch và lại lấy lại data một lần nữa. Vậy nên chúng ta sử dụng react query để cache lại data mà không cần phải gọi lại hàm fetch mỗi lần load lại page.

## Cache data

Khi tạo 1 query cần truyền vào 1 key, các query được phân biệt với nhau dự vào key, tiêp theo thì truyền queryFuntion, cuối cùng là option.

```
const getListQuery = useQuery("list-query", callDataApi, {
    cacheTime: Infinity, //Thời gian cache data, ví dụ: 5000, sau 5s thì cache sẽ bị xóa, khi đó data trong cache sẽ là undefined
    refetchOnWindowFocus: false,
});

const { data } = getListQuery;
```

Ở đây có 2 option cần lưu ý:

- cacheTime: Thời gian data được cache. Nếu hết thời gian, giá trị của query tương ứng với key này sẽ là undefined.
- staleTime: Thời gian data trong cache được tính là mới, tức là nếu data query này trong cache được tính là mới thì khi gọi query sẽ không call queryFuntion để lấy dữ liệu cập nhật vào cache nữa. Mặc định staleTime là 0, tức là cứ dùng query sẽ gọi đến queryFunction.

<i>Vậy dù có vào trang chi tiết, khi quay lại trang danh sách vẫn có cache data cũ, đồng thời query vẫn gọi api để cập nhật dữ liệu mới nhất nếu có.</i>

## Xử lý các trạng thái loading, fetching với react query

Query có 2 thuộc tính là `isLoading`, `isFetching`. Có thể hiểu đơn giản là `isLoading` sẽ true khi api được gọi / khi cache không có data, isFetching sẽ là true khi cache có data nhưng đang gọi queryFunction để cập nhật dữ liệu mới nhất.

```
const getListQuery = useQuery("list-query", callDataApi, {
    cacheTime: Infinity, //Thời gian cache data, ví dụ: 5000, sau 5s thì cache sẽ bị xóa, khi đó data trong cache sẽ là undefined
    refetchOnWindowFocus: false,
    staleTime: 10000,
});

const { data, isLoading, isFetching } = getListQuery;
```

## Giảm thiểu call api, lấy dữ liệu từ cache

Để tối ưu xử lý này với react-query, mình tạo 1 hook, xử lý tạo query và trả về query.

```
function useGetList() {

  //....

  const getListQuery = useQuery("list-query", callDataApi, {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval:
  });

  return getListQuery;
}

export default useGetList;
```

Ở các trang sử dụng chỉ cần dùng hook:

```
const getListQuery = useGetList();

const { data, isLoading, isFetching, refetch } = getListQuery;
```

Khi sử dụng hook này tức là các trang đang query cùng 1 key lấy data từ cache nên nếu data đã có sẽ không bị gọi lại, cách viết cũng ngắn gọn. Ngoài ra có thể làm mới data bằng cách chủ động bằng refetch hoặc refetchInterval nếu cần thiết.

## Các thuộc tính của react query

✅ Refetch khi focus tab

```
// Mặc định: true
refetchOnWindowFocus: true
```

✅ Caching + Background Sync

```
staleTime: 10000 // sau 10s mới tính là stale
```

✅ Polling / Auto refetch

```
refetchInterval: 3000 // tự fetch lại mỗi 3s
```

| Tính năng              | Mô tả                                          |
| ---------------------- | ---------------------------------------------- |
| `useQuery`             | Dùng để **get** dữ liệu                        |
| `useMutation`          | Dùng để **POST, PUT, DELETE** dữ liệu          |
| `queryKey`             | Khóa định danh cache (bắt buộc)                |
| `queryFn`              | Hàm fetch dữ liệu                              |
| `refetch`              | Hàm gọi lại query theo yêu cầu                 |
| `staleTime`            | Khoảng thời gian dữ liệu vẫn được coi là "mới" |
| `onSuccess`, `onError` | Callback sau khi fetch xong                    |

📚 Ví dụ: Gọi API và cập nhật danh sách

```
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function TodoList() {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('/todos').then(res => res.data)
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

```
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export function AddTodo() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo) =>
      axios.post('/todos', newTodo).then(res => res.data),

    onSuccess: () => {
      // Sau khi thêm thành công → invalidate danh sách để fetch lại
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle(''); // Clear input
    },

    onError: (error) => {
      alert('Lỗi khi thêm TODO: ' + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title }); // Gửi dữ liệu lên API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập todo..."
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Đang thêm...' : 'Thêm'}
      </button>
    </form>
  );
}
```

- mutate: là hàm bạn dùng để "kích hoạt" mutation, tức là gọi API thật sự
- mutationFn nhận newTodo chính là { title: '...' }
- Gọi invalidateQueries để yêu cầu React Query refetch lại danh sách todos

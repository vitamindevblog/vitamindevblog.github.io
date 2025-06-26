---
slug: redux-toolkit
title: Redux Toolkit - Một Công Cụ Mạnh Mẽ Hơn Redux?
category: Reactjs
description: "Nếu bạn đã quen với Redux truyền thống (action, reducer, store), Redux Toolkit sẽ giúp viết ít hơn – hiệu quả hơn – và dễ scale hơn."
img: redux-toolkit.jpg
date: 26 June 2025
author: thiennt
---

## Redux Toolkit so với Redux

Redux và Redux Toolkit đều giúp quản lý trạng thái ứng dụng, nhưng RTK mang đến nhiều lợi ích đáng kể so với Redux thuần túy.

1. Đơn giản hóa cú pháp: Trong Redux, bạn cần tạo ra action types, action creators, và reducers riêng biệt cho mỗi trạng thái. Trong khi đó, RTK sử dụng hàm createSlice để tạo ra cả ba.
2. Cấu hình cơ sở dữ liệu giảm thiểu: RTK đi kèm với Redux Thunk và Redux DevTools, giúp giảm thiểu công việc cấu hình.
3. Immutability trực tiếp: Redux yêu cầu sử dụng cú pháp "immutable" để thay đổi trạng thái. RTK cho phép bạn viết code "mutable" thực tế mà vẫn giữ được tính "immutable".

## Kiến thức cốt lõi Redux Toolkit

| Thành phần            | Ý nghĩa                                     |
| --------------------- | ------------------------------------------- |
| `configureStore`      | Tạo store, tự cấu hình middleware, DevTools |
| `createSlice`         | Gộp reducer + action lại 1 chỗ              |
| `createAsyncThunk`    | Xử lý async logic (gọi API, loading, error) |
| `createEntityAdapter` | Hỗ trợ quản lý danh sách object theo ID     |
| `createSelector`      | Memoized selector (giống reselect)          |

### Setup cơ bản

#### Tạo store

```
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

```
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```

#### createSlice – Gộp reducer + action

```
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },  // có thể mutate nhờ Immer
    decrement: (state) => { state.value -= 1 },
    addByAmount: (state, action) => { state.value += action.payload }
  }
});

export const { increment, decrement, addByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

#### Dùng trong React component

```
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      Tăng ({count})
    </button>
  );
}
```

#### createAsyncThunk – Xử lý bất đồng bộ

```
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Gọi API async
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get('/todos');
    return response.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
```

Khi createAsyncThunk hoàn thành (success), action có dạng:

```
{
  type: 'users/fetchUsers/fulfilled',
  payload: [ /* dữ liệu từ API */ ],
  meta: {
    arg: undefined, // hoặc dữ liệu gửi vào thunk nếu có
    requestId: 'abc123',
    requestStatus: 'fulfilled',
  }
}
```

#### Kết hợp Redux Toolkit + React

| Tác vụ          | Hook                                          |
| --------------- | --------------------------------------------- |
| Lấy state       | `useSelector(state => state.sliceName.value)` |
| Dispatch action | `const dispatch = useDispatch()`              |
| Gọi asyncThunk  | `dispatch(fetchData())`                       |

#### Advanced Features

✅ createEntityAdapter: createEntityAdapter giúp bạn quản lý trạng thái có cấu trúc phức tạp một cách dễ dàng. Nó tạo ra một tập hợp các selectors, action creators và reducer giúp bạn thao tác với các entities.

<b>Cách sử dụng:</b>

```
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await axios.get('/api/todos');
  return res.data;
});

// 🔹 1. Khởi tạo adapter
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id, // optional nếu id không phải là "id"
  sortComparer: (a, b) => a.title.localeCompare(b.title) // optional nếu muốn auto sort
});
// 🔹 2. Lấy initialState
const initialState = todosAdapter.getInitialState({
  loading: false,
  error: null,
});

// 🔹 3. Tạo slice với reducer dùng adapter methods
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoRemoved: todosAdapter.removeOne,
    todoUpdated: todosAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  todoAdded,
  todoRemoved,
  todoUpdated
} = todosSlice.actions;

export const todosSelectors = todosAdapter.getSelectors((state) => state.todos);

export default todosSlice.reducer;
```

<b>🧙‍♂️ Sử dụng selector từ adapter</b>

```
export const todosSelectors = todosAdapter.getSelectors(
  (state) => state.todos
);

// Sử dụng trong component:
const todos = useSelector(todosSelectors.selectAll); // trả về mảng todos
const todoById = useSelector((state) => todosSelectors.selectById(state, 3));
const total = useSelector(todosSelectors.selectTotal);
```

✅ Cách sử dụng trong React Component

```
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodos,
  todosSelectors,
  todoRemoved,
} from '../features/todos/todosSlice';

export default function TodoList() {
  const dispatch = useDispatch();

  // Lấy danh sách todos từ selector của adapter
  const todos = useSelector(todosSelectors.selectAll);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(todoRemoved(id)); // Xóa local
    // Nếu cần xóa trên API: dispatch(async thunk gọi DELETE)
  };

  return (
    <div>
      <h2>Danh sách công việc</h2>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

✅ createSelector: Tạo selector có cache:

```
const selectTodos = state => state.todos.data;

export const selectDoneTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => todo.done)
);
```

Trong ví dụ trên, createEntityAdapter tạo ra một adapter cho 'users', với một initial state rỗng. Bạn có thể sử dụng các phương thức của usersAdapter để thao tác với trạng thái này, ví dụ như usersAdapter.addOne(state, user) để thêm một user.

#### So sánh Redux Toolkit vs Redux truyền thống

| Tiêu chí    | Redux cũ                           | Redux Toolkit                |
| ----------- | ---------------------------------- | ---------------------------- |
| Action Type | Viết thủ công                      | Tự sinh                      |
| Reducer     | Viết `switch-case`                 | Viết bằng object, dùng immer |
| Async Logic | Viết thunk tay hoặc saga           | Có `createAsyncThunk`        |
| Store setup | Tự import applyMiddleware, compose | `configureStore()` lo hết    |
| DevTools    | Phải tự setup                      | Có sẵn                       |

---
slug: 40-javascript-shortcuts-every-developer-should-know
title: 40 Shortcuts trong Javascrip mà các developer nên biết
category: Javascript
description: "This post highlights 40 essential JavaScript shortcuts for developers in 2025, categorized for easy learning."
img: 40-short-cut.jpg
date: 17 June 2025
author: thiennt
---

### JavaScript đang phát triển nhanh chóng và việc thành thạo các phím tắt phù hợp có thể giúp bạn trở thành một nhà phát triển nhanh hơn, thông minh hơn và hiệu quả hơn

#### 1- 10: Cú pháp ngắn gọn

```
// 1. Ternary Operator
const isAdult = age >= 18 ? "Yes" : "No";

// 2. Default Parameters
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

// 3. Arrow Functions
const add = (a, b) => a + b;

// 4. Destructuring Objects
const { name, age } = person;

// 5. Destructuring Arrays
const [first, second] = colors;

// 6. Template Literals
const message = `Hi, ${user.name}!`;

// 7. Spread Operator
const newArray = [...oldArray, 4];

// 8. Rest Parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

// 9. Optional Chaining
const street = user?.address?.street;

// 10. Nullish Coalescing
const username = inputName ?? "Anonymous";
```

#### 11- 20: Logic, Loop và Array

```
// 11. Short-circuit Evaluation
const status = isLoggedIn && "Welcome!";

// 12. Logical OR Assignment
user.name ||= "Guest";

// 13. Logical AND Assignment
settings.debug &&= false;

// 14. Object Property Shorthand
const age = 30;
const person = { name, age };

// 15. Computed Property Names
const key = "level";
const player = { [key]: 42 };

// 16. For-of Loop
for (const item of items) {
  console.log(item);
}

// 17. forEach Loop
items.forEach(item => console.log(item));

// 18. Map Function
const squared = nums.map(n => n * n);

// 19. Filter Function
const evens = nums.filter(n => n % 2 === 0);

// 20. Reduce Function
const total = nums.reduce((a, b) => a + b, 0);
```

#### 21- 30: Object và Array

```
// 21. Includes Check
const found = list.includes("apple");

// 22. Set for Unique Values
const unique = [...new Set(array)];

// 23. Object.entries
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

// 24. Object.values
const vals = Object.values(obj);

// 25. Object.keys
const keys = Object.keys(obj);

// 26. Chaining Array Methods
const result = data.filter(a => a.active).map(a => a.name);

// 27. Flatten Array
const array = [1, , 3, ["a", , "c"]];
console.log(array.flat()); // [1, 3, "a", "c"]

// 28. Trim String
const cleaned = str.trim();

// 29. Pad String
const padded = "5".padStart(2, "0"); // '05'

// 30. Intl.NumberFormat
const price = new Intl.NumberFormat().format(1234567); // '1,234,567'
```

#### 31 - 40: Thủ thuật

```
// 31. Dynamic Import
const module = await import('./module.js');

// 32. Promise.all
await Promise.all([fetchData(), loadUI()]);

// 33. Async/Await
const fetchData = async () => {
  const res = await fetch(url);
  return res.json();
};

// 34. Optional Parameters in Functions
function log(message, level = "info") {
  console[level](message);
}

// 35. Number Conversion with Unary +
const num = +"42";

// 36. Boolean Conversion with !!
const isTrue = !!value;

// 37. Short Array Swap
[a, b] = [b, a];

// 38. Quick String to Array
const chars = [..."hello"];

// 39. Quick Object Clone
const copy = { ...original };

// 40. Debounce Function (Utility)
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
```

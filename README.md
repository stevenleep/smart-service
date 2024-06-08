![smart-api](./smart-api.svg)

# Smart API

Simplify the writing of Javascript front-end Service layer code by using json configuration..

## Features

- [x] Automatically generate API request functions through simple JSON configuration.
- [x] Completely use your own request library to initiate interface requests (does not rely on any request library internally).
- [x] Supports Proxy and Loose modes, available in IE.
- [x] TypeScript Support.

## Installation

You can install it using pnpm or yarn:

```bash
pnpm add @stevenleep/smart-api
# or
yarn add @stevenleep/smart-api
```


## Usage
```typescript
import { ProxyServices } from "@stevenleep/smart-api";
// Your request instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// connect to your request instance
const { createServices } = new ProxyServices(axiosInstance);

// Your API configuration
const postServices = createServices({
  getPosts: "/posts",
});

// send request
postServices.getPosts().then((res) => {
  console.log(res);
});
```

## Use in IE
If you need to use the `createServices` API in an IE environment, you can use `LooseServices` initialization.
> Compared with ProxyServices mode, LooseServices mode uses `Reflect.defineProperty` to create request functions.
```typescript
import { LooseServices } from "@stevenleep/smart-api";
// Your request instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// connect to your request instance
const { createServices } = new LooseServices(axiosInstance);

// Your API configuration
const postServices = createServices({
  getPosts: "/posts",
});

// send request
postServices.getPosts().then((res) => {
  console.log(res);
});
```

## Examples
- [LooseServices Simple Demo](./examples/loose-services-simple.html)
- [ProxyServices Simple Demo](./examples/proxy-services-simple.html)

## API
- [For more usage, view the API documentation](./docs//apis.md)

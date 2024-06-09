# Smart service

Simplify the writing of Javascript front-end Service layer code by using json configuration..

https://github.com/stevenleep/smart-service/assets/106362981/2b98ec30-6601-448a-a589-891d4b195873

## Features

- [x] Automatically generate API request functions through simple JSON configuration.
- [x] Completely use your own request library to initiate interface requests (does not rely on any request library internally).
- [x] Supports Proxy and Loose modes, available in IE.
- [x] TypeScript Support.

## Installation

You can install it using pnpm or yarn:

```bash
pnpm add @stevenleep/smart-service
# or
yarn add @stevenleep/smart-service
```

## Usage
```typescript
import { ProxyService } from "@stevenleep/smart-service";

// Create an axios instance
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// connect axiosInstance to ProxyService
const { createServices } = new ProxyService(axiosInstance);
const postServices = createServices({ getPosts: "/posts" });

// Call the getPosts function to get the data from the server side
postServices.getPosts().then((res) => {
  console.log(res);
});
```

## Use in IE
If you need to use the `createServices` API in an IE environment, you can use `LooseService` initialization.
> Compared with ProxyService mode, LooseService mode uses `Reflect.defineProperty` to create request functions.
```typescript
import { LooseService } from "@stevenleep/smart-service";
const axiosInstance = ...;
const { createServices } = new LooseService(axiosInstance);
```

## API
- [For more usage, view the API documentation](https://github.com/stevenleep/smart-service/blob/main/docs/apis.md)


## Examples
- [LooseServices Simple Demo](https://github.com/stevenleep/smart-service/blob/main/examples/loose-services-simple.html)
- [ProxyServices Simple Demo](https://github.com/stevenleep/smart-service/blob/main/examples/proxy-services-simple.html)

## Contributing
- [Contributing Guide](https://github.com/stevenleep/smart-service/blob/main/docs/contributing.md)
- [Publish Guide](https://github.com/stevenleep/smart-service/blob/main/docs/publish.md)

## Purpose and Scope

This document provides a high-level introduction to the @stevenleep/smart-service library, explaining its core purpose, architecture, and key components. It covers the fundamental concepts of how the library transforms JSON configuration into executable API request functions using two different proxy strategies.

For detailed configuration options, see [Configuration System.](https://deepwiki.com/stevenleep/smart-service/3.3-configuration-system) For implementation specifics of each proxy strategy, see [ProxyService](https://deepwiki.com/stevenleep/smart-service/3.1-proxyservice) and [LooseService](https://deepwiki.com/stevenleep/smart-service/3.2-looseservice).

https://github.com/stevenleep/smart-service/assets/106362981/c97b6041-7efd-4906-ab02-dc428840534a

## What is Smart Service

Smart Service is a TypeScript library that automatically generates API request functions from simple JSON configuration. Instead of manually writing repetitive service layer code, developers define their API endpoints in JSON format and the library creates type-safe, executable request functions.

The library is HTTP client agnostic - it works with any request library (axios, fetch, custom clients) by accepting a "root instance" that handles the actual HTTP requests. The core innovation is using JavaScript's proxy mechanisms to dynamically create request functions at runtime.

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

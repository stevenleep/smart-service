![smart-api](./smart-api.svg) 

# Smart API
**Smart API** is an innovative library that generates JavaScript API request functions through description files and JSON configurations. 

## Features

- **Automatic API Request Generation**: Generates necessary API request functions automatically through description files and JSON configurations.
- **Service Layer Simplification**: Reduces the need for manually writing repetitive request code, improving code maintainability.
- **Enhanced Development Efficiency**: Allows developers to focus on business logic rather than the implementation of API requests.

## Installation

You can install it using pnpm or yarn:

```bash
pnpm add @stevenleep/smart-api
# or
yarn add @stevenleep/smart-api
```

## Usage

```typescript
import { createSmartAPIServices } from "@stevenleep/smart-api";

const api = {
    getApps: "/applications",
};

const appServices = createSmartAPIServices(api);
// GET /applications
appServices.getApps();
```
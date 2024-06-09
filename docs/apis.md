# API

## Declare

```typescript
declare class ProxyService {
  private readonly rootInstance;
  private readonly options;
  constructor(rootInstance: any, options?: ServiceConstructorOptions);
  createServices<
    UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps
  >(serviceConfigs?: UserServicesConfigMaps): UserServicesConfigMaps;
}

declare class LooseService {
  private readonly rootInstance;
  private readonly options;
  constructor(rootInstance: any, options?: ServiceConstructorOptions);
  createServices<
    UserServiceConfigs extends DefaultServicesConfigMaps = DefaultServicesConfigMaps
  >(serviceConfigs?: UserServiceConfigs): {};
}
```

## ProxyServices/LooseServices

````typescript
export type ServiceConstructorOptions<
  Namespaces extends Object = Record<string, string>
> = {
  // /**
  //  * 允许自定义请求库实例
  //  */
  // instance?: any;

  /**
   * 默认请求方法
   */
  defaultMethod?: SupportedRequestMethods;

  /**
   * Namespaces 命名空间
   * @example
   * ```json
   * {
   *    "default": "/api/v1",
   *    "v2": "/api/v2",
   *    "open": "/open"
   * }
   * ```
   * @type {Record<string, string> ｜ string}
   */
  namespaces?: string | (Namespaces & { default: string });
};
````

## createServices

```typescript
type ServiceConfig = {
  /**
   * 请求方法
   */
  method?: SupportedRequestMethods;
  /**
   * 请求路径
   */
  path?: string;
  /**
   * 使用的命名空间，默认使用 `default` 命名空间
   * 如果设置为 string 类型，则使用 `namespaces` 中的对应路径
   */
  namespace?: string;
  /**
   * 使用自定义的请求库实例
   */
  instance?: any;
};
```

export type RequestMethods =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options"
  | "trace"
  | "connect";

export type SupportedRequestMethods =
  | RequestMethods
  | Uppercase<RequestMethods>
  | Capitalize<RequestMethods>
  | Uncapitalize<RequestMethods>;

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

export type ServiceConfig = {
  /**
   * 请求方法
   */
  method?: SupportedRequestMethods;

  /**
   * 调用名称
   */
  // callName?: string;

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

export type DefaultServicesConfigMaps = Record<string, ServiceConfig | string>;

export type AnyRequestFunction = (...args: any[]) => Promise<any>;

export type ReturnTypes<
  ServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps,
  Keys extends keyof ServicesConfigMaps = keyof ServicesConfigMaps
> = {
  [key in Keys]: AnyRequestFunction
};

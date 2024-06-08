type RequestMethods = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "trace" | "connect";
type SupportedRequestMethods = RequestMethods | Uppercase<RequestMethods> | Capitalize<RequestMethods> | Uncapitalize<RequestMethods>;
type ServiceConstructorOptions<Namespaces extends Object = Record<string, string>> = {
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
    namespaces?: string | (Namespaces & {
        default: string;
    });
};
type ServiceConfig = {
    /**
     * 请求方法
     */
    method?: SupportedRequestMethods;
    /**
     * 调用名称
     */
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
type DefaultServiceConfigs = Record<string, ServiceConfig | string>;

declare class ProxyServices {
    private readonly rootInstance;
    private readonly options;
    constructor(rootInstance: any, options?: ServiceConstructorOptions);
    createServices<UserServiceConfigs extends DefaultServiceConfigs = DefaultServiceConfigs>(serviceConfigs?: UserServiceConfigs): UserServiceConfigs;
}

export { DefaultServiceConfigs, ProxyServices, RequestMethods, ServiceConfig, ServiceConstructorOptions, SupportedRequestMethods };

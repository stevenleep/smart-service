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
type DefaultServicesConfigMaps = Record<string, ServiceConfig | string>;

declare function createProxy<UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps, Options extends ServiceConstructorOptions = ServiceConstructorOptions>(servicesConfigMaps: UserServicesConfigMaps, rootInstance: any, options?: Options): UserServicesConfigMaps;
declare class ProxyService {
    private readonly rootInstance;
    private readonly options;
    constructor(rootInstance: any, options?: ServiceConstructorOptions);
    createServices<UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps>(serviceConfigs?: UserServicesConfigMaps): UserServicesConfigMaps;
}

declare function createLooseProxy<UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps, Options extends ServiceConstructorOptions = ServiceConstructorOptions>(servicesConfigMaps: UserServicesConfigMaps, rootInstance: any, options?: Options): {};
declare class LooseService {
    private readonly rootInstance;
    private readonly options;
    constructor(rootInstance: any, options?: ServiceConstructorOptions);
    createServices<UserServiceConfigs extends DefaultServicesConfigMaps = DefaultServicesConfigMaps>(serviceConfigs?: UserServiceConfigs): {};
}

declare function getRequestInstance(rootInstance: any, options: ServiceConfig): any;
declare function getNamespacePath(namespaces: string | Record<string, string>, namespaceName: string): string;
/**
 * 创建请求函数
 */
declare function createRequestFunction(requestInstance: any, serviceConfig: Omit<ServiceConfig, "method"> & {
    method: SupportedRequestMethods;
}): <Params extends any[] = any[], ResultType = any>(...args: Params) => Promise<ResultType>;
declare function getRequestPath(options: ServiceConstructorOptions, serviceConfig: ServiceConfig): string;
declare function createDefaultServiceConfig(serviceConfig: ServiceConfig | string, options: ServiceConstructorOptions): ServiceConfig;
declare function safeServiceConfig(serviceConfigMaps: DefaultServicesConfigMaps, key: string, options: ServiceConstructorOptions): ServiceConfig;

export { DefaultServicesConfigMaps, LooseService, ProxyService, RequestMethods, ServiceConfig, ServiceConstructorOptions, SupportedRequestMethods, createDefaultServiceConfig, createLooseProxy, createProxy, createRequestFunction, getNamespacePath, getRequestInstance, getRequestPath, safeServiceConfig };

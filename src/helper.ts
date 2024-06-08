import {
  DefaultServicesConfigMaps,
  ServiceConfig,
  ServiceConstructorOptions,
  SupportedRequestMethods,
} from "./interface";

export function getRequestInstance(rootInstance: any, options: ServiceConfig) {
  if (options?.instance) {
    return options.instance;
  }

  if (rootInstance) {
    return rootInstance;
  }

  throw new Error("Request Instance not found");
}

export function getNamespacePath(
  namespaces: string | Record<string, string>,
  namespaceName: string
) {
  if (typeof namespaces === "string") {
    return namespaces;
  }

  return (
    Reflect.get(namespaces, namespaceName) ||
    Reflect.get(namespaces, "default") ||
    ""
  );
}

/**
 * 创建请求函数
 */
export function createRequestFunction(
  requestInstance: any,
  serviceConfig: Omit<ServiceConfig, "method"> & {
    method: SupportedRequestMethods;
  }
) {
  return async function <Params extends any[] = any[], ResultType = any>(
    ...args: Params
  ): Promise<ResultType> {
    const { method, path } = serviceConfig;
    if (!requestInstance[method]) {
      throw new Error(`Method ${method} not found`);
    }
    return requestInstance[method](path, ...args) as Promise<ResultType>;
  };
}

export function getRequestPath(
  options: ServiceConstructorOptions,
  serviceConfig: ServiceConfig
) {
  const namespacePath = serviceConfig.namespace
    ? getNamespacePath(options.namespaces || {}, serviceConfig.namespace)
    : getNamespacePath(options.namespaces || {}, "default") || "";
  return `${namespacePath}${serviceConfig.path}`;
}

export function createDefaultServiceConfig(
  serviceConfig: ServiceConfig | string,
  options: ServiceConstructorOptions
): ServiceConfig {
  if (typeof serviceConfig === "string") {
    return {
      path: serviceConfig,
      method: options.defaultMethod || "get",
      namespace: "default",
    };
  }

  return serviceConfig;
}

export function safeServiceConfig(
  serviceConfigMaps: DefaultServicesConfigMaps,
  key: string,
  options: ServiceConstructorOptions
): ServiceConfig {
  return createDefaultServiceConfig(
    Reflect.get(serviceConfigMaps, key),
    options
  );
}

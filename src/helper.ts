import { ServiceConfig, SupportedRequestMethods } from "./interface";

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
    console.log("requestInstance", requestInstance);
    const { method, path } = serviceConfig;

    if (!requestInstance[method]) {
      throw new Error(`Method ${method} not found`);
    }

    return requestInstance[method](path, ...args) as Promise<ResultType>;
  };
}

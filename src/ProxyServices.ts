import {
  ServiceConstructorOptions,
  DefaultServiceConfigs,
  ServiceConfig,
} from "./interface";
import {
  getRequestInstance,
  createRequestFunction,
  getNamespacePath,
} from "./helper";

function createProxy<
  UserServiceConfigs extends DefaultServiceConfigs = DefaultServiceConfigs,
  Options extends ServiceConstructorOptions = ServiceConstructorOptions
>(
  serviceConfigs: UserServiceConfigs,
  rootInstance,
  options: Options = {} as Options
) {
  return new Proxy(serviceConfigs, {
    get(target, prop, receiver) {
      if (prop in target) {
        let serviceConfig = Reflect.get(target, prop, receiver);
        
        if (typeof serviceConfig === "string") {
          // @ts-ignore
          serviceConfig = {
            path: serviceConfig,
            method: options.defaultMethod || "get",
            namespace: "default",
          } as unknown as ServiceConfig;
        }

        const requestInstance = getRequestInstance(rootInstance, serviceConfig);

        // 获取命名空间路径
        const namespacePath = serviceConfig.namespace
          ? getNamespacePath(options.namespaces || {}, serviceConfig.namespace)
          : getNamespacePath(options.namespaces || {}, "default") || "";
        const requestPath = `${namespacePath}${serviceConfig.path}`;

        return createRequestFunction(requestInstance, {
          ...serviceConfig,
          path: requestPath,
          method: serviceConfig.method || options.defaultMethod || "get",
        });
      }

      throw new Error(`Service ${String(prop)} not found`);
    },

    set(target, prop, value, receiver) {
      throw new Error(`Service ${String(prop)} cannot be set`);
    },

    deleteProperty(target, prop) {
      throw new Error(`Service ${String(prop)} cannot be deleted`);
    },
  });
}

export class ProxyServices {
  constructor(
    private readonly rootInstance: any,
    private readonly options: ServiceConstructorOptions = {}
  ) {
    if (!rootInstance) {
      throw new Error("Root Instance not found");
    }

    this.createServices = this.createServices.bind(this);
  }

  public createServices<
    UserServiceConfigs extends DefaultServiceConfigs = DefaultServiceConfigs
  >(serviceConfigs: UserServiceConfigs = {} as UserServiceConfigs) {
    return createProxy(serviceConfigs, this.rootInstance, this.options);
  }
}

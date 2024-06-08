import {
  createRequestFunction,
  getNamespacePath,
  getRequestInstance,
} from "./helper";
import {
  DefaultServiceConfigs,
  ServiceConfig,
  ServiceConstructorOptions,
} from "./interface";

export function createProxy<
  UserServiceConfigs extends DefaultServiceConfigs = DefaultServiceConfigs,
  Options extends ServiceConstructorOptions = ServiceConstructorOptions
>(
  serviceConfigs: UserServiceConfigs,
  rootInstance: any,
  options: Options = {} as Options
) {
  return Object.keys(serviceConfigs).reduce((acc, key) => {
    let serviceConfig = Reflect.get(serviceConfigs, key) as ServiceConfig;
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

    Reflect.defineProperty(acc, key, {
      get() {
        return createRequestFunction(requestInstance, {
          ...serviceConfig,
          path: requestPath,
          method: serviceConfig.method || options.defaultMethod || "get",
        });
      },

      // 不可修改
      configurable: false,
      
      enumerable: true,

      set(prop: string) {
        throw new Error(`Service ${String(prop)} cannot be set`);
      },
    });

    return acc;
  }, {});
}

export class LooseServices {
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

import {
  createRequestFunction,
  getRequestInstance,
  getRequestPath,
  safeServiceConfig,
} from "./helper";
import {
  DefaultServicesConfigMaps,
  ReturnTypes,
  ServiceConstructorOptions,
} from "./interface";

export function createLooseProxy<
  UserServicesConfigMaps extends DefaultServicesConfigMaps = DefaultServicesConfigMaps,
  Options extends ServiceConstructorOptions = ServiceConstructorOptions
>(
  servicesConfigMaps: UserServicesConfigMaps,
  rootInstance: any,
  options: Options = {} as Options
): ReturnTypes<UserServicesConfigMaps> {
  return Object.keys(servicesConfigMaps).reduce((acc, key) => {
    const serviceConfig = safeServiceConfig(servicesConfigMaps, key, options);
    const requestInstance = getRequestInstance(rootInstance, serviceConfig);
    Reflect.defineProperty(acc, key, {
      get() {
        return createRequestFunction(requestInstance, {
          ...serviceConfig,
          path: getRequestPath(options, serviceConfig),
          method: serviceConfig?.method || options?.defaultMethod || "get",
        });
      },
      configurable: false,
      enumerable: true,
      set(prop: string) {
        throw new Error(`Service ${String(prop)} cannot be set`);
      },
    });

    return acc;
  }, {} as ReturnTypes<UserServicesConfigMaps>);
}

export class LooseService {
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
    UserServiceConfigs extends DefaultServicesConfigMaps = DefaultServicesConfigMaps
  >(serviceConfigs: UserServiceConfigs = {} as UserServiceConfigs) {
    return createLooseProxy(serviceConfigs, this.rootInstance, this.options);
  }
}

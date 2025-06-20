import { fileName } from './gen-utils';
import { Options } from './options';

/**
 * Stores the global variables used on generation
 */
export class Globals {

  configurationClass: string;
  configurationFile: string;
  configurationParams: string;
  baseServiceClass: string;
  baseServiceFile: string;
  apiServiceClass?: string;
  apiServiceFile?: string;
  requestBuilderClass: string;
  requestBuilderFile: string;
  responseClass: string;
  responseFile: string;
  moduleClass?: string;
  moduleFile?: string;
  modelIndexFile?: string;
  serviceIndexFile?: string;
  rootUrl?: string;
  standalone: boolean;

  constructor(options: Options) {
    this.standalone = options.standalone || false;
    this.configurationClass = options.configuration || 'ApiConfiguration';
    this.configurationFile = fileName(this.configurationClass);
    this.configurationParams = `${this.configurationClass}Params`;
    this.baseServiceClass = options.baseService || 'BaseService';
    this.baseServiceFile = fileName(this.baseServiceClass);
    this.apiServiceClass = options.apiService || '';
    if (this.apiServiceClass === '') {
      this.apiServiceClass = undefined;
    } else {
      // Angular's best practices demands xxx.service.ts, not xxx-service.ts
      this.apiServiceFile = fileName(this.apiServiceClass).replace(/\-service$/, '.service');
    }
    this.requestBuilderClass = options.requestBuilder || 'RequestBuilder';
    this.requestBuilderFile = fileName(this.requestBuilderClass);
    this.responseClass = options.response || 'StrictHttpResponse';
    this.responseFile = fileName(this.responseClass);
    if (options.standalone !== true && options.module !== false && options.module !== '') {
      this.moduleClass = options.module === true || options.module === undefined ? 'ApiModule' : options.module;
      // Angular's best practices demands xxx.module.ts, not xxx-module.ts
      this.moduleFile = fileName(this.moduleClass as string).replace(/\-module$/, '.module');
    }
    if (options.serviceIndex !== false && options.serviceIndex !== '') {
      this.serviceIndexFile = options.serviceIndex === true || options.serviceIndex === undefined ? 'services' : options.serviceIndex;
    }
    if (options.modelIndex !== false && options.modelIndex !== '') {
      this.modelIndexFile = options.modelIndex === true || options.modelIndex === undefined ? 'models' : options.modelIndex;
    }
  }

}

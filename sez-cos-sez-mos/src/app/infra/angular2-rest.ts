
import {throwError as observableThrowError, Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
    HttpHeaders as AngularHeaders,
    HttpClient,
    HttpRequest, // replaiced by HttpRequest
    // RequestMethod, // possible conversion is HTTPCleint
    // RequestOptions,   // possible vonversion with HttpRequest
    HttpResponse,
  //  ResponseContentType,  // replaiced by http client
    HttpParams, // used for URLSearchParams 
    HttpHeaders
} from "@angular/common/http";
import {forOwn as _forOwn,
        forEach as _forEach,
        includes as _includes} from "lodash";
import { Injectable } from '@angular/core';


/**
 * Angular 2 RESTClient class.
 *
 * @class RESTClient
 * @constructor
 */
@Injectable({
    providedIn:"root"
})
export class RESTClient {

    public constructor(protected http: HttpClient) {
    }

    protected getBaseUrl(): string {
        return null;
    };

    protected getDefaultHeaders(): Object {
        return {
            "Content-Type": "application/json"
        };
    };

    /**
     * Request Interceptor
     *
     * @method requestInterceptor
     * @param {Request} req - request object
     */
    protected requestInterceptor(req: HttpRequest<any>, disableScoping: boolean):HttpRequest<any> {
        // to be overridden
        return req;
    }

    /**
     * Response Interceptor
     *
     * @method responseInterceptor
     * @param {Response} res - response object
     * @returns {Response} res - transformed response object
     */
    protected responseInterceptor(res: HttpResponse<any>, req: HttpRequest<any>): HttpResponse<any> {
        try {
            return res;
        } catch (err) {
            return res;
        }
    }

    protected responseErrorInterceptor(err: HttpResponse<any>, req: HttpRequest<any>, errorMessageKeyPrefix: string): HttpResponse<any> {
        return err;
    }
}

/**
 * Set the base URL of REST resource
 * @param {String} url - base URL
 */
export function BaseUrl(url: string) {
    return function <TFunction extends Function>(target: TFunction): TFunction {
        target.prototype.getBaseUrl = function () {
            return url;
        };
        return target;
    };
}

/**
 * Set default headers for every method of the RESTClient
 * @param {Object} headers - deafult headers in a key-value pair
 */
export function DefaultHeaders(headers: any) {
    return function <TFunction extends Function>(target: TFunction): TFunction {
        target.prototype.getDefaultHeaders = function () {
            return headers;
        };
        return target;
    };
}

function paramBuilder(paramName: string) {
    return function (key: string) {
        return function (target: RESTClient, propertyKey: string | symbol, parameterIndex: number) {
            const metadataKey = `${propertyKey.toString()}_${paramName}_parameters`;
            const paramObj = {
                parameterIndex: parameterIndex,
                key: key
            };
            if (Array.isArray(target[metadataKey])) {
                target[metadataKey].push(paramObj);
            } else {
                target[metadataKey] = [paramObj];
            }
        };
    };
}

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export var Path = paramBuilder("Path");
/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export var Query = paramBuilder("Query");

export var QueryObject = paramBuilder("QueryObject")("QueryObject");
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export var Body = paramBuilder("Body")("Body");
/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export var Header = paramBuilder("Header");

export var FileUpload = paramBuilder("FileUpload")("FileUpload");

export var MixedMultipart = function (fileProperty: string) {
    return function (target: RESTClient, propertyKey: string | symbol, parameterIndex: number) {
        const metadataKey = `${propertyKey.toString()}_MixedMultipart_parameters`;
        target[metadataKey] = {fileProperty: fileProperty, parameterIndex: parameterIndex};
    };
};


/**
 * Set custom headers for a REST method
 * @param {Object} headersDef - custom headers in a key-value pair
 */
export function Headers(headersDef: any) {
    return function (target: RESTClient, propertyKey: string, descriptor: any) {
        descriptor.headers = headersDef;
        console.log(descriptor)
        return descriptor;
    };
}

function methodBuilder(method: string) {
    return function (url: string) {
        return function (target: RESTClient, propertyKey: string, descriptor: any) {
           
            const pPath = target[`${propertyKey}_Path_parameters`];
            const pQuery = target[`${propertyKey}_Query_parameters`];
            const pQueryObject = target[`${propertyKey}_QueryObject_parameters`];
            const pBody = target[`${propertyKey}_Body_parameters`];
            const pHeader = target[`${propertyKey}_Header_parameters`];
            const errorMessageKeyPrefix = target[`${propertyKey}_ErrorHandler_parameters`];
            const skipErrorHandlerForStatusCodes = target[`${propertyKey}_SkipErrorHandler_statusCodes`];
            const responseType = target[`${propertyKey}_ResponseType_parameters`];
            const disableScoping = target[`${propertyKey}_DisableScoping_parameters`];
            const pFileUpload = target[`${propertyKey}_FileUpload_parameters`];
            const pMixedMultipart = target[`${propertyKey}_MixedMultipart_parameters`];
            
            
            descriptor.value = function (...args: any[]) {

                // Body
                let body = null;
                if (pBody) {
                    body = JSON.stringify(args[pBody[0].parameterIndex]);
                }

                // Path
                let preparedUrl = url;
                if (pPath) {
                    _forOwn(pPath, (k) => {
                        preparedUrl = preparedUrl.replace("{" + k.key + "}", args[k.parameterIndex]);
                    });
                }

                // Query
                let search = new HttpParams();
                if (pQuery) {
                    pQuery
                        .forEach(p => {
                            const key = p.key;
                            let value = args[p.parameterIndex];
                            // if the value is a instance of Object, we stringify it
                            if (value !== undefined && value !== null) {
                                if (value instanceof Object) {
                                    value = JSON.stringify(value);
                                }
                                search = search.append(key, value);
                            }
                        });
                }

                if (pQueryObject) {
                    pQueryObject
                        .forEach(p => {
                            let value = args[p.parameterIndex];
                            if (value instanceof Object) {
                                _forOwn(value, (prop, name) => {
                                        if (prop !== undefined && prop !== null
                                            && !(prop instanceof Object)) {
                                                // console.log(name, prop);
                                                search = search.append(name, prop);
                                        }
                                    }
                                );
                            } else {
                                throw "Parameter annotated @QueryObject must be Object!";
                            }
                        });
                }

                if (disableScoping) {
                    search = search.append("noscope", "true");
                }
                // Headers
                let headers = new HttpHeaders(this.getDefaultHeaders());
                _forOwn(descriptor.headers, (headerProp, name) => {
                    headers.append(name, headerProp);
                });

                if (pHeader) {
                    console.log(args[1]);
                    _forOwn(pHeader, (prop) => headers = headers.append(prop.key, args[prop.parameterIndex]));
                }

                if(pHeader && pHeader.headers){

                    let customeHeader = pHeader.headers;
                    console.log(customeHeader)
                    for ( let k in customeHeader){
                        headers.append(k, customeHeader[k]);
                    }
                }
               
                if (pFileUpload) {
                    body = new FormData();
                    const file = args[pFileUpload[0].parameterIndex];
                    body.append("file", file, file.name);
                    headers = new HttpHeaders();
                }

                if (pMixedMultipart) {
                    body = new FormData();
                    const obj = args[pMixedMultipart.parameterIndex];
                    const fileProp = pMixedMultipart.fileProperty;
                    const file = obj[fileProp];

                    if (file) {

                        if (file.length) {
                            _forEach(file, function(f) {
                                body.append("file", f, f.name);
                            });

                        } else if(file instanceof File){
                            body.append("file", file, file.name);
                        }
                    }
                    body.append("json", new Blob([JSON.stringify(obj)], {
                        type: "application/json"
                    }));
                    headers = new HttpHeaders(); //AngularHeaders();
                }

                // Request options
                // const options = new RequestOptions({
                //     method,
                //     url: this.getBaseUrl() + preparedUrl,
                //     headers,
                //     body,
                //     search,
                //     responseType: responseType
                // });
                
                

                const options = {
                    method:method,
                    url: this.getBaseUrl() + preparedUrl,
                    headers,
                    body,
                    search,
                    responseType: responseType
                };

                if(preparedUrl.indexOf(".json") > -1) {
                    options.url = options.url.replace("api/",""); 
                }
               

                let req = new HttpRequest(options.method,options.url,options.body, {
                    headers,
                    params:search,
                    responseType: responseType
                });

                // intercept the request
                req =this.requestInterceptor(req, disableScoping);
                // make the request and store the observable for later transformation
                // return this.http.request(req)
                return this.http.request(options.method,options.url, {
                    body:options.body,
                    headers: req.headers,
                    params:search,
                    responseType: responseType
                    // observe:'response'
                })
                .pipe(
                    map(resp => this.responseInterceptor(resp, req)),
                    catchError((err: Response) => {
                        if (skipErrorHandlerForStatusCodes &&
                            (skipErrorHandlerForStatusCodes.length === 0 || _includes(skipErrorHandlerForStatusCodes, err.status)))
                            return observableThrowError(err);
                        else {
                            return observableThrowError(this.responseErrorInterceptor(err, req, errorMessageKeyPrefix));
                        }
                    })
                );
            };

            return descriptor;
        };
    };
}

/**
 * GET method
 * @param {string} url - resource url of the method
 * RequestMethod.Get replaiced by 'GET'
 */
export var GET = methodBuilder('GET');
/**
 * POST method
 * @param {string} url - resource url of the method
 * RequestMethod.Post replaced by 'POST'
 */
export var POST = methodBuilder('POST');
/**
 * PUT method
 * @param {string} url - resource url of the method,
 * 
 * RequestMethod.Put replaced by 'PUT'
 */
export var PUT = methodBuilder('PUT');
/**
 * DELETE method
 * @param {string} url - resource url of the method
 * replaced by 'DELETE'
 */
export var DELETE = methodBuilder('DELETE');

export var ErrorHandler = function (errorMessageKeyPrefix: string) {
    return function (target: RESTClient, propertyKey: string, descriptor: any) {
        target[`${propertyKey}_ErrorHandler_parameters`] = errorMessageKeyPrefix;
        return descriptor;
    };
};

export var SkipErrorHandler = function (...statusCodes: number[]) {
    return function (target: RESTClient, propertyKey: string, descriptor: any) {
        target[`${propertyKey}_SkipErrorHandler_statusCodes`] = statusCodes;
        return descriptor;
    };
};

export var DisableScoping = function () {
    return function (target: RESTClient, propertyKey: string, descriptor: any) {
        target[`${propertyKey}_DisableScoping_parameters`] = true;
        return descriptor;
    };
};

// export var ResponseType = function (responseType: ResponseContentType) {
export var ResponseType = function (responseType: string) {    
    return function (target: RESTClient, propertyKey: string, descriptor: any) {
        target[`${propertyKey}_ResponseType_parameters`] = responseType;
        return descriptor;
    };
};
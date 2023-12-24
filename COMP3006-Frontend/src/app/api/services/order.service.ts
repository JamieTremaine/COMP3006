/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Order } from '../models/order';
import { orderOrderIdDelete } from '../fn/order/order-order-id-delete';
import { OrderOrderIdDelete$Params } from '../fn/order/order-order-id-delete';
import { orderPost } from '../fn/order/order-post';
import { OrderPost$Params } from '../fn/order/order-post';
import { orderUserIdGet } from '../fn/order/order-user-id-get';
import { OrderUserIdGet$Params } from '../fn/order/order-user-id-get';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `orderUserIdGet()` */
  static readonly OrderUserIdGetPath = '/order/{userId}';

  /**
   * Use to get a singular order by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderUserIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderUserIdGet$Response(params: OrderUserIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
    return orderUserIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Use to get a singular order by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderUserIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderUserIdGet(params: OrderUserIdGet$Params, context?: HttpContext): Observable<Order> {
    return this.orderUserIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Order>): Order => r.body)
    );
  }

  /** Path part for operation `orderPost()` */
  static readonly OrderPostPath = '/order';

  /**
   * add a new order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderPost$Response(params: OrderPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
    return orderPost(this.http, this.rootUrl, params, context);
  }

  /**
   * add a new order
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderPost(params: OrderPost$Params, context?: HttpContext): Observable<Order> {
    return this.orderPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Order>): Order => r.body)
    );
  }

  /** Path part for operation `orderOrderIdDelete()` */
  static readonly OrderOrderIdDeletePath = '/order/{orderId}';

  /**
   * delete an existing order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderOrderIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderOrderIdDelete$Response(params: OrderOrderIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return orderOrderIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete an existing order
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderOrderIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderOrderIdDelete(params: OrderOrderIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.orderOrderIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

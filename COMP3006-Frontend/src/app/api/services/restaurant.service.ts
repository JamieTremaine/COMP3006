/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Restaurant } from '../models/restaurant';
import { restaurantGetAllGet } from '../fn/restaurant/restaurant-get-all-get';
import { RestaurantGetAllGet$Params } from '../fn/restaurant/restaurant-get-all-get';
import { restaurantPost } from '../fn/restaurant/restaurant-post';
import { RestaurantPost$Params } from '../fn/restaurant/restaurant-post';
import { restaurantRestaurantIdDelete } from '../fn/restaurant/restaurant-restaurant-id-delete';
import { RestaurantRestaurantIdDelete$Params } from '../fn/restaurant/restaurant-restaurant-id-delete';
import { restaurantRestaurantIdGet } from '../fn/restaurant/restaurant-restaurant-id-get';
import { RestaurantRestaurantIdGet$Params } from '../fn/restaurant/restaurant-restaurant-id-get';
import { restaurantRestaurantIdPut } from '../fn/restaurant/restaurant-restaurant-id-put';
import { RestaurantRestaurantIdPut$Params } from '../fn/restaurant/restaurant-restaurant-id-put';

@Injectable({ providedIn: 'root' })
export class RestaurantService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `restaurantRestaurantIdGet()` */
  static readonly RestaurantRestaurantIdGetPath = '/restaurant/{restaurantId}';

  /**
   * Use to get a singular restaurant by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restaurantRestaurantIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  restaurantRestaurantIdGet$Response(params: RestaurantRestaurantIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Restaurant>> {
    return restaurantRestaurantIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Use to get a singular restaurant by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `restaurantRestaurantIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restaurantRestaurantIdGet(params: RestaurantRestaurantIdGet$Params, context?: HttpContext): Observable<Restaurant> {
    return this.restaurantRestaurantIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Restaurant>): Restaurant => r.body)
    );
  }

  /** Path part for operation `restaurantRestaurantIdPut()` */
  static readonly RestaurantRestaurantIdPutPath = '/restaurant/{restaurantId}';

  /**
   * update an existing restaurant
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restaurantRestaurantIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restaurantRestaurantIdPut$Response(params: RestaurantRestaurantIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return restaurantRestaurantIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * update an existing restaurant
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `restaurantRestaurantIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restaurantRestaurantIdPut(params: RestaurantRestaurantIdPut$Params, context?: HttpContext): Observable<void> {
    return this.restaurantRestaurantIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `restaurantRestaurantIdDelete()` */
  static readonly RestaurantRestaurantIdDeletePath = '/restaurant/{restaurantId}';

  /**
   * delete an existing restaurant
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restaurantRestaurantIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  restaurantRestaurantIdDelete$Response(params: RestaurantRestaurantIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return restaurantRestaurantIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete an existing restaurant
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `restaurantRestaurantIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restaurantRestaurantIdDelete(params: RestaurantRestaurantIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.restaurantRestaurantIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `restaurantGetAllGet()` */
  static readonly RestaurantGetAllGetPath = '/restaurant/get/all';

  /**
   * Use to get all restaurants
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restaurantGetAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  restaurantGetAllGet$Response(params?: RestaurantGetAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Restaurant>> {
    return restaurantGetAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Use to get all restaurants
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `restaurantGetAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restaurantGetAllGet(params?: RestaurantGetAllGet$Params, context?: HttpContext): Observable<Restaurant> {
    return this.restaurantGetAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Restaurant>): Restaurant => r.body)
    );
  }

  /** Path part for operation `restaurantPost()` */
  static readonly RestaurantPostPath = '/restaurant';

  /**
   * add a new restaurant
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restaurantPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restaurantPost$Response(params: RestaurantPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Restaurant>> {
    return restaurantPost(this.http, this.rootUrl, params, context);
  }

  /**
   * add a new restaurant
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `restaurantPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restaurantPost(params: RestaurantPost$Params, context?: HttpContext): Observable<Restaurant> {
    return this.restaurantPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Restaurant>): Restaurant => r.body)
    );
  }

}

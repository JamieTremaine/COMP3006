/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Menu } from '../models/menu';
import { menuMenuidDelete } from '../fn/menu/menu-menuid-delete';
import { MenuMenuidDelete$Params } from '../fn/menu/menu-menuid-delete';
import { menuMenuIdGet } from '../fn/menu/menu-menu-id-get';
import { MenuMenuIdGet$Params } from '../fn/menu/menu-menu-id-get';
import { menuMenuidPut } from '../fn/menu/menu-menuid-put';
import { MenuMenuidPut$Params } from '../fn/menu/menu-menuid-put';
import { menuPost } from '../fn/menu/menu-post';
import { MenuPost$Params } from '../fn/menu/menu-post';
import { menuRestaurantIdCurrentGet } from '../fn/menu/menu-restaurant-id-current-get';
import { MenuRestaurantIdCurrentGet$Params } from '../fn/menu/menu-restaurant-id-current-get';

@Injectable({ providedIn: 'root' })
export class MenuService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `menuMenuIdGet()` */
  static readonly MenuMenuIdGetPath = '/menu/{menuId}';

  /**
   * Use to get a singular menu by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuMenuIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuMenuIdGet$Response(params: MenuMenuIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Menu>> {
    return menuMenuIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Use to get a singular menu by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuMenuIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuMenuIdGet(params: MenuMenuIdGet$Params, context?: HttpContext): Observable<Menu> {
    return this.menuMenuIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Menu>): Menu => r.body)
    );
  }

  /** Path part for operation `menuRestaurantIdCurrentGet()` */
  static readonly MenuRestaurantIdCurrentGetPath = '/menu/{restaurantId}/current';

  /**
   * Use to get a the current menu used by a resturant
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuRestaurantIdCurrentGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuRestaurantIdCurrentGet$Response(params: MenuRestaurantIdCurrentGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Menu>> {
    return menuRestaurantIdCurrentGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Use to get a the current menu used by a resturant
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuRestaurantIdCurrentGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuRestaurantIdCurrentGet(params: MenuRestaurantIdCurrentGet$Params, context?: HttpContext): Observable<Menu> {
    return this.menuRestaurantIdCurrentGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Menu>): Menu => r.body)
    );
  }

  /** Path part for operation `menuPost()` */
  static readonly MenuPostPath = '/menu';

  /**
   * add a new menu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  menuPost$Response(params: MenuPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Menu>> {
    return menuPost(this.http, this.rootUrl, params, context);
  }

  /**
   * add a new menu
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  menuPost(params: MenuPost$Params, context?: HttpContext): Observable<Menu> {
    return this.menuPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Menu>): Menu => r.body)
    );
  }

  /** Path part for operation `menuMenuidPut()` */
  static readonly MenuMenuidPutPath = '/menu/{menuid}';

  /**
   * update an existing menu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuMenuidPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  menuMenuidPut$Response(params: MenuMenuidPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return menuMenuidPut(this.http, this.rootUrl, params, context);
  }

  /**
   * update an existing menu
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuMenuidPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  menuMenuidPut(params: MenuMenuidPut$Params, context?: HttpContext): Observable<void> {
    return this.menuMenuidPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `menuMenuidDelete()` */
  static readonly MenuMenuidDeletePath = '/menu/{menuid}';

  /**
   * delete an existing menu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuMenuidDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuMenuidDelete$Response(params: MenuMenuidDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return menuMenuidDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete an existing menu
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuMenuidDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuMenuidDelete(params: MenuMenuidDelete$Params, context?: HttpContext): Observable<void> {
    return this.menuMenuidDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

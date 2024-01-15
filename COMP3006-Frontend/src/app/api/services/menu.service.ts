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
import { menuMenuIdDelete } from '../fn/menu/menu-menu-id-delete';
import { MenuMenuIdDelete$Params } from '../fn/menu/menu-menu-id-delete';
import { menuMenuIdGet } from '../fn/menu/menu-menu-id-get';
import { MenuMenuIdGet$Params } from '../fn/menu/menu-menu-id-get';
import { menuMenuIdPut } from '../fn/menu/menu-menu-id-put';
import { MenuMenuIdPut$Params } from '../fn/menu/menu-menu-id-put';
import { menuPost } from '../fn/menu/menu-post';
import { MenuPost$Params } from '../fn/menu/menu-post';
import { menuRestaurantIdAllGet } from '../fn/menu/menu-restaurant-id-all-get';
import { MenuRestaurantIdAllGet$Params } from '../fn/menu/menu-restaurant-id-all-get';
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

  /** Path part for operation `menuMenuIdPut()` */
  static readonly MenuMenuIdPutPath = '/menu/{menuId}';

  /**
   * update an existing menu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuMenuIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  menuMenuIdPut$Response(params: MenuMenuIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return menuMenuIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * update an existing menu
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuMenuIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  menuMenuIdPut(params: MenuMenuIdPut$Params, context?: HttpContext): Observable<void> {
    return this.menuMenuIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `menuMenuIdDelete()` */
  static readonly MenuMenuIdDeletePath = '/menu/{menuId}';

  /**
   * delete an existing menu
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuMenuIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuMenuIdDelete$Response(params: MenuMenuIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return menuMenuIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete an existing menu
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuMenuIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuMenuIdDelete(params: MenuMenuIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.menuMenuIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
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

  /** Path part for operation `menuRestaurantIdAllGet()` */
  static readonly MenuRestaurantIdAllGetPath = '/menu/{restaurantId}/all';

  /**
   * All menus for a restaurant
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `menuRestaurantIdAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuRestaurantIdAllGet$Response(params: MenuRestaurantIdAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Menu>>> {
    return menuRestaurantIdAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * All menus for a restaurant
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `menuRestaurantIdAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  menuRestaurantIdAllGet(params: MenuRestaurantIdAllGet$Params, context?: HttpContext): Observable<Array<Menu>> {
    return this.menuRestaurantIdAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Menu>>): Array<Menu> => r.body)
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

}

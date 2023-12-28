/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Menu } from '../../models/menu';

export interface MenuRestaurantIdCurrentGet$Params {
  restaurantId: any;
}

export function menuRestaurantIdCurrentGet(http: HttpClient, rootUrl: string, params: MenuRestaurantIdCurrentGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Menu>> {
  const rb = new RequestBuilder(rootUrl, menuRestaurantIdCurrentGet.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Menu>;
    })
  );
}

menuRestaurantIdCurrentGet.PATH = '/menu/{restaurantId}/current';

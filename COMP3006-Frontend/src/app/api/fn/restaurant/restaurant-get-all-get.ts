/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Restaurant } from '../../models/restaurant';

export interface RestaurantGetAllGet$Params {
}

export function restaurantGetAllGet(http: HttpClient, rootUrl: string, params?: RestaurantGetAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Restaurant>> {
  const rb = new RequestBuilder(rootUrl, restaurantGetAllGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Restaurant>;
    })
  );
}

restaurantGetAllGet.PATH = '/restaurant/get/all';

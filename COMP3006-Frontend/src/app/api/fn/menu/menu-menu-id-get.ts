/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Menu } from '../../models/menu';

export interface MenuMenuIdGet$Params {
  menuId: any;
}

export function menuMenuIdGet(http: HttpClient, rootUrl: string, params: MenuMenuIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Menu>> {
  const rb = new RequestBuilder(rootUrl, menuMenuIdGet.PATH, 'get');
  if (params) {
    rb.path('menuId', params.menuId, {});
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

menuMenuIdGet.PATH = '/menu/{menuId}';

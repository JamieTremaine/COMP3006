/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';
import { User } from '../../models/user';

export interface UserUserIdAddressesPost$Params {
  userId: any;
      body: Array<Address>
}

export function userUserIdAddressesPost(http: HttpClient, rootUrl: string, params: UserUserIdAddressesPost$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, userUserIdAddressesPost.PATH, 'post');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

userUserIdAddressesPost.PATH = '/user/{userId}/addresses';

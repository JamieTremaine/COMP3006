/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { User } from '../models/user';
import { userLoginPost } from '../fn/user/user-login-post';
import { UserLoginPost$Params } from '../fn/user/user-login-post';
import { userPost } from '../fn/user/user-post';
import { UserPost$Params } from '../fn/user/user-post';
import { userUsernameGet } from '../fn/user/user-username-get';
import { UserUsernameGet$Params } from '../fn/user/user-username-get';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userLoginPost()` */
  static readonly UserLoginPostPath = '/user/login';

  /**
   * login
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLoginPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLoginPost$Response(params: UserLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userLoginPost(this.http, this.rootUrl, params, context);
  }

  /**
   * login
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLoginPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLoginPost(params: UserLoginPost$Params, context?: HttpContext): Observable<User> {
    return this.userLoginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userPost()` */
  static readonly UserPostPath = '/user';

  /**
   * create user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userPost$Response(params: UserPost$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userPost(this.http, this.rootUrl, params, context);
  }

  /**
   * create user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userPost(params: UserPost$Params, context?: HttpContext): Observable<User> {
    return this.userPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userUsernameGet()` */
  static readonly UserUsernameGetPath = '/user/{username}';

  /**
   * Use to get a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userUsernameGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  userUsernameGet$Response(params: UserUsernameGet$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userUsernameGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Use to get a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userUsernameGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userUsernameGet(params: UserUsernameGet$Params, context?: HttpContext): Observable<User> {
    return this.userUsernameGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgUserService {

  private loggedIn: boolean = false;
  public LoggedInSubject = new Subject<boolean>();

  constructor() { }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): Promise<boolean> {
    this.loggedIn = true;
    this.LoggedInSubject.next(true);
    return Promise.resolve(true);
  }
}

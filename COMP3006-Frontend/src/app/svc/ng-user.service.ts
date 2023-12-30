import { Injectable } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';
import { UserService } from '../api/services';
import { User, Userlogin } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class NgUserService {

  private loggedIn: boolean = false;
  private user?: User;
  public LoggedInSubject = new Subject<boolean>();

  constructor(private userService: UserService) { }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

    login(username: string, password: string): Promise<boolean> {

        const loginCreds: Userlogin = { username: username , password: password };

        return lastValueFrom(this.userService.userLoginPost({body: loginCreds})).then((result) => {
            if(result._id) {
                this.user = result;
                this.loggedIn = true;
                this.LoggedInSubject.next(true);
                return true;
            } else {
                return false;
            }
        }).catch(() => false);
        
    }
}

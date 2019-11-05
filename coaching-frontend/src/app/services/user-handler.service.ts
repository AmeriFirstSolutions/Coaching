import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {

  private API_URL = environment.API_URL;

  authenticateUser(userNameToTest: string, userPasswordToTest: string): Observable<User> {
    let userToLogIn = new User();
    userToLogIn.UserName = userNameToTest
    userToLogIn.UserPassword = userPasswordToTest
    let srchResult = this.httpClient.post(this.API_URL + '/api/user', userToLogIn)

      .pipe(map((serverResponsePackage) => {
        let curUser = new User();
        if (serverResponsePackage['Data']) {
          curUser.UserName = serverResponsePackage['Data'].UserName;
          curUser.UserPassword = serverResponsePackage['Data'].UserPassword;
          return curUser;
        } else {
          throw new Error();
        }

      }));
    return srchResult;
 
  }

  constructor(private httpClient: HttpClient) { }
}

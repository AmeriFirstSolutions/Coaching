import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from 'src/app/models/Record'
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RecordHandlerService {
  private API_URL = environment.API_URL;


  getEmployeeNames(userTeam: string): Observable<String> {
    let nameListResult = this.httpClient.get<string>(this.API_URL + '/api/Employee?userTeam=' + userTeam)
    return nameListResult;
  } 



  constructor(private httpClient: HttpClient) { }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceMessageHandlerService {
  private API_URL = environment.API_URL;


  //getLoanOriginators(): Observable<any> {
  //  let recordListResult = this.httpClient.get<any>(this.API_URL + '/api/Originator?originatorID=')
  //    .pipe(map((serverResponsePackage) => {
  //      return serverResponsePackage['Data'];
  //    }));
  //  return recordListResult;
  //}

  getMessage(application: string): Observable<any> {
    let recordListResult = this.httpClient.get<any>(this.API_URL + '/api/MaintenanceMessage?application=' + application)
      .pipe(map((serverResponsePackage) => {
        return serverResponsePackage['Data'];
      }));
    return recordListResult;
  }


  formatDate(dateToFormat: string) {
    if (dateToFormat == null) {
      return "";
    }
    else {
      let arrayOfDateParts = dateToFormat.split(" ");
      return arrayOfDateParts[0];
    }
  }

  constructor(private httpClient: HttpClient) { }
}

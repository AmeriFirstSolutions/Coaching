import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserHandlerService } from './services/user-handler.service';
import { MaintenanceMessageHandlerService } from './services/maintenancemessage-handler.service';
import { User } from './models/user';
import notify from 'devextreme/ui/notify';
import { confirm, alert } from 'devextreme/ui/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  applicationTitle = environment.ApplicationTitle;

  @Input()
  loggedInUserName: string = null;

  @Input()
  loggedInUserTeam: string = null;

  @Input()
  loggedInUserPassword: string = null;


  ngOnInit() {
    this.loadMaintenanceMessage("CD");


  }

  private loadMaintenanceMessage(application: string) {
    this.maintenanceMessageHandlerService.getMessage(application).subscribe(
      (recordResult) => {
        if (recordResult.MessageText != null) {
          alert(recordResult.MessageText, "Information:");
        }
      }
    )
  }

  public loginTheUser(userObjToCheck: User): void {
    if (userObjToCheck.UserName == "" || userObjToCheck.UserPassword == "") {
      notify("Please enter a Username and Password", "warning", 3000);
      return;
    }

    let currentUserName = userObjToCheck.UserName
    let currentUserPassword = userObjToCheck.UserPassword

    this.userHandlerService.authenticateUser(currentUserName, currentUserPassword).subscribe(
      user => {
        if (user.UserName == "") {
          notify("Login Failed.  Please try again.", "error", 3000);
          return;
        }
        else {
          this.loggedInUserName = user.UserName;
          this.loggedInUserPassword = user.UserPassword;
          this.loggedInUserTeam = user.UserTeam;
         
         
        }
      }
    )
  }








  constructor(private userHandlerService: UserHandlerService, private maintenanceMessageHandlerService: MaintenanceMessageHandlerService) { }
}

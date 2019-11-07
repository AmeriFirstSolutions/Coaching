import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import notify from 'devextreme/ui/notify';
import { AppComponent } from '../app.component';
import { confirm, alert } from 'devextreme/ui/dialog';
import { Record } from 'src/app/models/Record'
import { RecordHandlerService } from 'src/app/services/record-handler.service'
import { UserHandlerService } from 'src/app/services/user-handler.service'

import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent,
  DxDateBoxModule,
  DxFormModule,
  DxFileUploaderModule,
  DxDataGridComponent,
  DxNumberBoxModule,
  DxTextAreaModule
} from 'devextreme-angular';



@Component({
  selector: 'coaching-entry',
  templateUrl: './coaching-entry.component.html',
  styleUrls: ['./coaching-entry.component.css']
})
export class CoachingEntryComponent implements OnInit {
  @Input() loggedInUserName: string = null;
  @Input() loggedInUserTeam: string = null;

  employeeNames = null

  constructor(private recordHandlerService: RecordHandlerService, private userHandlerService: UserHandlerService, @Inject(DOCUMENT) private document: any ) {}

  ngOnInit() {


    this.recordHandlerService.getEmployeeNames(this.loggedInUserTeam).subscribe((employeeNames) => {
      this.employeeNames = employeeNames.split(';')
      
    });

  }














}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CoachingEntryComponent } from './coaching-entry/coaching-entry.component';

// DevExtreme 
import {
  DxDropDownBoxModule,
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxTabPanelModule,
  DxTreeViewModule,
  DxFormModule,
  DxPopupModule,
  DxFileUploaderModule,
  DxNumberBoxModule,
  DxTextAreaModule
} from 'devextreme-angular'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoachingEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AngularFontAwesomeModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxDropDownBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxTabPanelModule,
    DxTreeViewModule,
    DxFormModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxNumberBoxModule,
    DxTextAreaModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

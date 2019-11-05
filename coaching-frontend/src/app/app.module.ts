import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

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
  DxChartModule
} from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    DxChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

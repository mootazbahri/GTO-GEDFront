import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { DisplayDocumentComponent } from './displayDocument/displayDocument.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from "./page/accueil/accueil.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PagesComponent } from "./page/page.component";
import { NgZorroAntdModule, NZ_I18N, en_US, fr_FR } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstLevelComponent } from "../app/page/FirstLevel/firstLevel.component";
import { SecondeLevelComponent } from "../app/page/SecondeLevel/secondeLevel.component";
import { ThirdLevelComponent } from "../app/page/thirdLevel/thirdLevel.component";
import { FourthLevelComponent } from "../app/page/fourthLevel/fourthLevel.component";
import { FifthLevelComponent } from "../app/page/fifthLevel/fifthLevel.component";
import { DisplayFileComponent } from "../app/page/displayFile/displayFile.component";
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DisplayDocumentComponent,
    LoginComponent,
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
    AccueilComponent,
    FirstLevelComponent,
    SecondeLevelComponent,
    ThirdLevelComponent,
    FourthLevelComponent,
    FifthLevelComponent,
    DisplayFileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ImageViewerModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

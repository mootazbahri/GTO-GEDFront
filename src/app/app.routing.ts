import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DisplayDocumentComponent } from './displayDocument';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PagesComponent } from "./page/page.component";
import { AccueilComponent } from "./page/accueil/accueil.component";
import { FirstLevelComponent } from "../app/page/FirstLevel/firstLevel.component";
import { SecondeLevelComponent } from "../app/page/SecondeLevel/secondeLevel.component";
import { ThirdLevelComponent } from "../app/page/thirdLevel/thirdLevel.component";
import { FourthLevelComponent } from "../app/page/fourthLevel/fourthLevel.component";
import { FifthLevelComponent } from "../app/page/fifthLevel/fifthLevel.component";
import { DisplayFileComponent } from "../app/page/displayFile/displayFile.component";

const appRoutes: Routes = [
    { path: 'displayDocument', component: DisplayDocumentComponent },
    { path: '', component: LoginComponent },
    {
        path: 'GED',
        component: PagesComponent,
        children: [
            { path: 'accueil',component: AccueilComponent },
            { path: 'accueilLevelOne',component: FirstLevelComponent },
            { path: 'accueilLevelTwo',component: SecondeLevelComponent },
            { path: 'accueilLevelThree',component: ThirdLevelComponent },
            { path: 'accueilLevelFour',component: FourthLevelComponent },
            { path: 'accueilLevelFive',component: FifthLevelComponent },
            { path: 'displayFile',component: DisplayFileComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
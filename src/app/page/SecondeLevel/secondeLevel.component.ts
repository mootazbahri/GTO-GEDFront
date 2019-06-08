import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AdministrateurGEDService } from 'src/service/administrateurGed.service';
import { HttpParams } from '@angular/common/http';
import { DocumentYear } from 'src/app/sidebar/DocumentYear';
import { DocumentMonths } from 'src/app/sidebar/DocumentMonths';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-secondeLevel',
  templateUrl: './secondeLevel.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SecondeLevelComponent implements OnInit {
  accueil: any;
  levelType: any;
  level1: boolean = false;
  DocumentMonths: DocumentMonths[] = [];
  order: any;
  monthNames = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private administrateurGedService: AdministrateurGEDService,
    private titleService: Title) {
    this.setTitle("GED - Accueil");
    this.route.queryParams.subscribe(params => {
      this.accueil = params['level'];
      this.levelType = params['levelType'];
      if(this.accueil == 'T'){
        this.getDocumentMonths(this.levelType);
      }else{
        this.getDocumentMonthsNotSorted(this.levelType);
      }
    });
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
  }

  getDocumentMonthsNotSorted(year) {
    this.administrateurGedService.getDocumentMonths(year, false).subscribe(
      data => {
        this.DocumentMonths = JSON.parse(data);
        console.log("notsorted" + year);
        console.log(this.DocumentMonths);
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocumentMonths(year) {
    this.administrateurGedService.getDocumentMonths(year, true).subscribe(
      data => {
        this.DocumentMonths = JSON.parse(data);
        console.log("sorted" + year);
        console.log(this.DocumentMonths);
      },
      error => {
        console.log(error);
      }
    );
  }

  openTypesPerMonth(month){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": this.accueil,
        "levelYear": this.levelType,
        "lovelMonth": month
      }
    }
    this.router.navigate(['/GED/accueilLevelThree'], navigationExtras);
  }
  openIdFolders(month){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": this.accueil,
        "levelYear": this.levelType,
        "lovelMonth": month
      }
    }
    this.router.navigate(['/GED/accueilLevelThree'], navigationExtras);
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AdministrateurGEDService } from 'src/service/administrateurGed.service';
import { HttpParams } from '@angular/common/http';
import { DocumentYear } from 'src/app/sidebar/DocumentYear';

@Component({
  selector: 'app-firstLevel',
  templateUrl: './firstLevel.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FirstLevelComponent implements OnInit {
  accueil : any;
  levelType : any;
  level1: boolean = false;
  documentYears: DocumentYear[] = [];
  documentYearsNotSorted: DocumentYear[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private administrateurGedService: AdministrateurGEDService,
    private titleService: Title) {
    this.setTitle("GED - Accueil");
    this.getDocumentsYears();
    this.getDocumentsYearsNotSorted();
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.accueil = params['level'];
      this.levelType = params['levelType'];
    });
    if(this.accueil == "FirstLevel"){
      this.level1 = true;
      console.log("undefined true => " + this.accueil + "level tpe" + this.levelType);
    }
  }

  getDocumentsYears(){
    this.administrateurGedService.getDocumentYears(true).subscribe(
      data => {
        this.documentYears = JSON.parse(data);
        console.log(this.documentYears);
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocumentsYearsNotSorted(){
    this.administrateurGedService.getDocumentYears(false).subscribe(
      data => {
        this.documentYearsNotSorted = JSON.parse(data);
        console.log(this.documentYearsNotSorted);
      },
      error => {
        console.log(error);
      }
    );
  }
  openYearFolder(year){
    console.log(year);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": this.levelType,
        "levelType": year
      }
    }
    this.router.navigate(['/GED/accueilLevelTwo'], navigationExtras);
    //accueilLevelTwo?level=T&levelType=2018
  }
}

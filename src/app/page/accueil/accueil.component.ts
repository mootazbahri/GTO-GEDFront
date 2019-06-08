import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AdministrateurGEDService } from 'src/service/administrateurGed.service';
import { HttpParams } from '@angular/common/http';
import { DocumentYear } from 'src/app/sidebar/DocumentYear';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AccueilComponent implements OnInit {
  accueil : any;
  levelType : any;
  level1: boolean = false;
  level0: boolean = false;
  documentYears: DocumentYear[] = [];
  documentYearsNotSorted: DocumentYear[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private administrateurGedService: AdministrateurGEDService,
    private titleService: Title) {
    this.setTitle("GED - Accueil");
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.accueil = params['level'];
      this.levelType = params['levelType'];
    });
    if(this.accueil == undefined){
      this.level0 = true;
    }
  }
  openDocs(type){
    console.log(type);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": "FirstLevel",
        "levelType": type
      }
    }
    console.log(navigationExtras);
    this.router.navigate(['/GED/accueilLevelOne'], navigationExtras);
  }
}

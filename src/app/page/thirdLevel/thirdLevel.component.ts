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
import { DocumentParYear } from 'src/app/sidebar/documentParYear';

@Component({
  selector: 'app-thirdLevel',
  templateUrl: './thirdLevel.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ThirdLevelComponent implements OnInit {
  monthNames = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
  level: any;
  levelYear: any;
  levelMonth: any;
  documentParYear: DocumentParYear[] = [];
  folderNumbers: any[] = [];
  DocTypeNames: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private administrateurGedService: AdministrateurGEDService,
    private titleService: Title) {
    this.setTitle("GED - Accueil");
    this.route.queryParams.subscribe(params => {
      this.level = params['level'];
      this.levelYear = params['levelYear'];
      this.levelMonth = params['lovelMonth'];
      if (this.level == "T") {
        this.getDocumentInfoByYear((documentParYear) => {
          this.documentParYear = documentParYear;
          this.getDocTypes();
        });
      } else {
        this.getDocumentInfoByYearNotSorted((documentParYear) => {
          this.documentParYear = documentParYear;
          this.getFolderNumbers();
        });
      }
    });

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
  }
  getDocumentInfoByYear(DocumentsInfoByWithYear) {
    this.administrateurGedService.getDocumentInfoByYear(true).subscribe(
      data => {
        DocumentsInfoByWithYear(JSON.parse(data));
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocumentInfoByYearNotSorted(DocumentsInfoByWithYear) {
    this.administrateurGedService.getDocumentInfoByYear(false).subscribe(
      data => {
        DocumentsInfoByWithYear(JSON.parse(data));
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocTypes() {
    //console.log(this.documentParYear);
    this.DocTypeNames = [];
    //console.log(this.documentParYear);
    this.documentParYear.forEach((element) => {
      let d = element.srcFile.split("/");
      if (this.isNumeric(d[2]) && element.year == this.levelYear && element.month == this.levelMonth) {
        //console.log(d[2]);
        this.DocTypeNames.push(d[2]);
      }
    });
    this.DocTypeNames = this.removeDuplicates();
  }
  getFolderNumbers() {
    this.folderNumbers = [];
    //console.log(this.documentParYear);
    this.documentParYear.forEach((element) => {
      let d = element.srcFile.split("/");
      if (!this.isNumeric(d[2]) && element.year == this.levelYear && element.month == this.levelMonth) {
        console.log(d[2]);
        this.folderNumbers.push(d[2]);
      }
    });
  }
  isNumeric(num) {
    return isNaN(num)
  }
  removeDuplicates() {
    let res : any [] = [];
    this.DocTypeNames.forEach((element)=>{
      if (res.find((test) => test === element) === undefined) {
        res.push(element);
      }
    });
    return res;
  }

  openTypeFolder(type){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": this.level,
        "levelYear": this.levelYear,
        "levelMonth": this.levelMonth,
        "IdOrType": type
      }
    }
    this.router.navigate(['/GED/accueilLevelFour'], navigationExtras);
  }
  openIdFolder(id){
    console.log("month folder"+id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": this.level,
        "levelYear": this.levelYear,
        "levelMonth": this.levelMonth,
        "IdOrType": id
      }
    }
    this.router.navigate(['/GED/accueilLevelFour'], navigationExtras);
  }
}

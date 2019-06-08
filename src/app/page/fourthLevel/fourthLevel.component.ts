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
  selector: 'app-fourthLevel',
  templateUrl: './fourthLevel.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FourthLevelComponent implements OnInit {
  monthNames = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
  folderNumbers: any[] = [];
  documentParYear: DocumentParYear[] = [];
  level: any;
  levelYear: any;
  levelMonth: any;
  IdOrType: any;
  fileName: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private administrateurGedService: AdministrateurGEDService,
    private titleService: Title) {
    this.setTitle("GED - Accueil");
    this.route.queryParams.subscribe(params => {
      this.level = params['level'];
      this.levelYear = params['levelYear'];
      this.levelMonth = params['levelMonth'];
      this.IdOrType = params['IdOrType'];
      if (this.level == "T") {
        this.getDocumentInfoByYear((documentParYear) => {
          this.documentParYear = documentParYear;
          this.getFolderNumbers();
        });
      } else {
        this.getDocumentInfoByYearNotSorted((documentParYear) => {
          this.documentParYear = documentParYear;
          this.getFile();
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
  getFile() {
    this.fileName = "";
    this.documentParYear.forEach((element) => {
      let d = element.srcFile.split("/");
      if (!this.isNumeric(d[2]) && element.id == this.IdOrType && element.year == this.levelYear && element.month == this.levelMonth) {
        this.fileName = d[3];
      }
    });
  }
  getFolderNumbers() {
    this.folderNumbers = [];
    this.documentParYear.forEach((element) => {
      let d = element.srcFile.split("/");
      if (d[2] == this.IdOrType && element.year == this.levelYear && element.month == this.levelMonth) {
        this.folderNumbers.push(d[3]);
      }
    });
  }
  isNumeric(num) {
    return isNaN(num)
  }
  openDisplayFile() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "idDocument": this.IdOrType
      }
    }
    this.router.navigate(['/GED/displayFile'], navigationExtras);
  }
  openDisplayFolder(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "level": this.level,
        "levelYear": this.levelYear,
        "levelMonth": this.levelMonth,
        "type": this.IdOrType,
        "Id": id
      }
    }
    this.router.navigate(['/GED/accueilLevelFive'], navigationExtras);
  }
}

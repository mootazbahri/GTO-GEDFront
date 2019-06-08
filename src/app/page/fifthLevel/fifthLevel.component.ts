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
  selector: 'app-fifthLevel',
  templateUrl: './fifthLevel.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FifthLevelComponent implements OnInit {
  monthNames = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
  documentParYear: DocumentParYear[] = [];
  level: any;
  levelYear: any;
  levelMonth: any;
  id: any;
  type: any;
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
      this.id = params['Id'];
      this.type = params['type'];
      if (this.level == "T") {
        this.getDocumentInfoByYear((documentParYear) => {
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
 
  getFile(){
    this.fileName = "";
    this.documentParYear.forEach((element) => {
      let d = [];
      d = element.srcFile.split("/");
      if (!this.isNumeric(d[3]) && d[2] == this.type && element.id == this.id && element.year == this.levelYear && element.month == this.levelMonth) {
        console.log(element)
        console.log(d[4])
        this.fileName = d[4];
      }
    });
    console.log(this.fileName)
  }
  isNumeric(num) {
    return isNaN(num)
  }
  openDisplayFile(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "idDocument": this.id
      }
    }
    this.router.navigate(['/GED/displayFile'], navigationExtras);
  }
}

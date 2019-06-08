import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GEDService } from '../../service/ged.service';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-display',
    templateUrl: './displayDocument.component.html',
    encapsulation: ViewEncapsulation.None
  })
export class DisplayDocumentComponent {
   public idDocument : any;
   public document : any;
    constructor(private route: ActivatedRoute,private gedService: GEDService,private titleService: Title) {
        this.route.queryParams.subscribe(params => {
            this.idDocument = JSON.parse(params['idDocument']);
        });
        this.getDocument();
    }
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
      }
    public getDocument(){
        this.gedService.getdocument(this.idDocument)
        .pipe(first())
        .subscribe(
            data => {
                this.document = JSON.parse(data);
                console.log(JSON.parse(data));
                this.setTitle("GED - Afficher Document");
            },
            error => {
                console.log(error);
            }
        );
    }
}

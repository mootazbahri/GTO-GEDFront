import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { AdministrateurGEDService } from 'src/service/administrateurGed.service';
import { DocumentYear } from './DocumentYear';
import { DocumentMonths } from './DocumentMonths';
import { TreeData, Inside } from './tree';
import { DocumentParYear } from './documentParYear';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Router, NavigationExtras } from '@angular/router';

const monthNames = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  documentYears: DocumentYear[] = [];
  DocumentMonths: DocumentMonths[] = [];
  documentParYear: DocumentParYear[] = [];
  documentParYearNotSorted: DocumentParYear[] = [];
  documentYearsNotSorted: DocumentYear[] = [];
  DocumentMonthsNotSorted: DocumentMonths[] = [];
  treeData: TreeData = new TreeData();
  treeDataNotSorted: TreeData = new TreeData();
  isLoaded: boolean = false;
  numberYear: number = 0;
  numberYearNotSorted: number = 0;
  dropdown: NzDropdownContextComponent;
  // actived node
  activedNode: NzTreeNode;
  nodes = [];
  constructor(private router: Router, private nzDropdownService: NzDropdownService, private administrateurGedService: AdministrateurGEDService) {
    this.getDocumentYear((documentYears) => {
      this.documentYears = documentYears;
      this.documentYears.forEach((documentYears) => {
        this.getDocumentMomnths(documentYears.year);
      });
    });
    this.getDocumentYearNotSorted((documentYears) => {
      this.documentYearsNotSorted = documentYears;
      this.documentYearsNotSorted.forEach((documentYears) => {
        this.getDocumentMomnthsNotSorted(documentYears.year);
      });
    });

    this.getDocumentInfoByYear((documentParYear) => {
      this.documentParYear = documentParYear;
    });
    this.getDocumentInfoByYearNotSorted((documentParYear) => {
      this.documentParYearNotSorted = documentParYear;
    });
  }

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
    //Launch a new component to see Folders at that level
    this.LaunchHomePage(data);
  }
  LaunchHomePage(data) {
    //console.log(data.parentNode);
    if (data.parentNode == null) {
      //console.log(data.title);
      if (data.title == "Document Trié" || data.title == "Document Pas Encore Trié") {
        let levelType: string = "NT";
        if (data.title == "Document Trié") {
          levelType = "T";
        }
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "level": "FirstLevel",
            "levelType": levelType
          }
        }
        this.router.navigate(['/GED/accueilLevelOne'], navigationExtras)
      }
    } else {
      if (data.parentNode.origin.title == "Document Trié" || data.parentNode.origin.title == "Document Pas Encore Trié") {
        // console.log("+-----------------------+");
        // console.log(data.parentNode.origin.title + " ==> " + data.origin.title);
        // console.log("+-----------------------+");
        let levelType: string = "NT";
        if (data.parentNode.origin.title == "Document Trié") {
          levelType = "T";
        }
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "level": levelType,
            "levelType": data.origin.title
          }
        }
        this.router.navigate(['/GED/accueilLevelTwo'], navigationExtras);
      }
      else {
        if (data.level == 2) {
          let levelType: string = "NT";
          if (data.parentNode.parentNode.origin.title == "Document Trié") {
            levelType = "T";
          }
          let res;
          let monthNbr = 1;
          monthNames.forEach((month) => {
            if (data.origin.title == month) {
              res = monthNbr;
            }
            monthNbr++;
          });
          // console.log("month:" + data.origin.title);
          // console.log("month NBR:" + res);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "level": levelType,
              "levelYear": data.parentNode.origin.title,
              "lovelMonth": res
            }
          }
          this.router.navigate(['/GED/accueilLevelThree'], navigationExtras);
        }
        else {
          if (data.level == 3) {
            let levelType: string = "NT";
            if (data.parentNode.parentNode.parentNode.origin.title == "Document Trié") {
              levelType = "T";
            }
            let res;
            let monthNbr = 1;
            monthNames.forEach((month) => {
              if (data.parentNode.origin.title == month) {
                res = monthNbr;
              }
              monthNbr++;
            });
            let navigationExtras: NavigationExtras = {
              queryParams: {
                "level": levelType,
                "levelYear": data.parentNode.parentNode.origin.title,
                "levelMonth": res,
                "IdOrType": data.origin.title
              }
            }
            this.router.navigate(['/GED/accueilLevelFour'], navigationExtras);
          }
          else{
            let levelType: string = "NT";
            if (data.parentNode.parentNode.parentNode.parentNode.origin.title == "Document Trié") {
              levelType = "T";
            }
            let res;
            let monthNbr = 1;
            monthNames.forEach((month) => {
              if (data.parentNode.parentNode.origin.title == month) {
                res = monthNbr;
              }
              monthNbr++;
            });
            let navigationExtras: NavigationExtras = {
              queryParams: {
                "level": levelType,
                "levelYear": data.parentNode.parentNode.parentNode.origin.title,
                "levelMonth": res,
                "type" : data.parentNode.origin.title,
                "Id": data.origin.title
              }
            }
            this.router.navigate(['/GED/accueilLevelFive'], navigationExtras);
          }
        }
      }
    }
  }
  openFile(data: NzTreeNode | Required<NzFormatEmitEvent>) {
    console.log("+----File----+");
    console.log(data);
    this.openFileSrc(data);
  }
  openFileSrc(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "idDocument": data.parentNode.origin.title
      }
    }
    this.router.navigate(['/GED/displayFile'], navigationExtras);
  
  }
  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  selectDropdown(): void {
    this.dropdown.close();
    // do something
  }

  ngOnInit() { }

  getDocumentMomnths(year) {
    this.administrateurGedService.getDocumentMonths(year, true).subscribe(
      data => {
        let inside: Inside = new Inside();
        this.DocumentMonths = JSON.parse(data);
        inside.documentYear = year;
        inside.documentMonth = this.DocumentMonths;
        this.treeData.data.push(inside);
        this.numberYear += 1;
        this.makeTree();
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocumentYear(documentYear) {
    this.administrateurGedService.getDocumentYears(true).subscribe(
      data => {
        documentYear(JSON.parse(data));
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocumentMomnthsNotSorted(year) {
    this.administrateurGedService.getDocumentMonths(year, false).subscribe(
      data => {
        let inside: Inside = new Inside();
        this.DocumentMonths = JSON.parse(data);
        inside.documentYear = year;
        inside.documentMonth = this.DocumentMonths;
        this.treeDataNotSorted.data.push(inside);
        this.numberYearNotSorted += 1;
        this.makeTree();
      },
      error => {
        console.log(error);
      }
    );
  }
  getDocumentYearNotSorted(documentYear) {
    this.administrateurGedService.getDocumentYears(false).subscribe(
      data => {
        documentYear(JSON.parse(data));
      },
      error => {
        console.log(error);
      }
    );
  }
  makeTree() {
    if (this.numberYear == this.documentYears.length && this.numberYearNotSorted == this.documentYearsNotSorted.length) {
      this.isLoaded = true;
      let nodesTri = [];
      let nodesNotTri = [];
      let MontsChildren = [];
      let open = true;
      this.treeData.data.forEach(element => {
        MontsChildren = [];
        element.documentMonth.forEach(month => {
          let ChildrenIdsSorted = this.fixDataSorted(element.documentYear, month.month);
          MontsChildren.push(
            {
              title: monthNames[month.month - 1],
              key: Math.floor(Math.random() * 1000000000) + 1,
              isLeaf: false,
              children: ChildrenIdsSorted
            }
          );
        });
        nodesTri.push(
          {
            title: element.documentYear.toString(),
            key: Math.floor(Math.random() * 1000000000) + 1,
            expanded: false,
            children: MontsChildren
          }
        );
      });
      this.treeDataNotSorted.data.forEach(element => {
        MontsChildren = [];
        element.documentMonth.forEach(month => {
          let ChildrenIds = this.fixDataNotSorted(element.documentYear, month.month);
          MontsChildren.push(
            {
              title: monthNames[month.month - 1],
              key: Math.floor(Math.random() * 1000000000) + 1,
              isLeaf: false,
              children: ChildrenIds
            }
          );
        });
        nodesNotTri.push(
          {
            title: element.documentYear.toString(),
            key: Math.floor(Math.random() * 1000000000) + 1,
            expanded: false,
            children: MontsChildren
          }
        );
      });
      //console.log(nodesTri);
      //console.log(nodesNotTri);
      this.nodes.push(
        {
          title: 'Document Trié',
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: true,
          children: nodesTri
        }
      );
      this.nodes.push(
        {
          title: 'Document Pas Encore Trié',
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodesNotTri
        }
      );
    } else {
      this.isLoaded = false;
    }
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
  fixDataSorted(year, month) {
    let d: string[] = [];
    let nodesSorted = [];
    let nodeAutre = [];
    let nodeDentaire = [];
    let nodeMedecin = [];
    let nodeOptique = [];
    let nodePharmacie = [];
    let nodeHopital = [];
    this.documentParYear.forEach(element => {
      d = element.srcFile.split("/");
      if (element.year == year && element.month == month) {
        if (this.isNumeric(d[2])) {
          switch (d[2]) {
            case "Autre":
              nodeAutre.push(
                {
                  title: element.id,
                  key: Math.floor(Math.random() * 1000000000) + 1,
                  expanded: false,
                  children: [
                    {
                      title: d[4],
                      key: Math.floor(Math.random() * 1000000000) + 1,
                      isLeaf: true
                    }
                  ]
                }
              );
              break;
            case "Pharmacie":
              nodePharmacie.push(
                {
                  title: element.id,
                  key: Math.floor(Math.random() * 1000000000) + 1,
                  expanded: false,
                  children: [
                    {
                      title: d[4],
                      key: Math.floor(Math.random() * 1000000000) + 1,
                      isLeaf: true
                    }
                  ]
                }
              );
              break;
            case "Médecin":
              nodeMedecin.push(
                {
                  title: element.id,
                  key: Math.floor(Math.random() * 1000000000) + 1,
                  expanded: false,
                  children: [
                    {
                      title: d[4],
                      key: Math.floor(Math.random() * 1000000000) + 1,
                      isLeaf: true
                    }
                  ]
                }
              );
              break;
            case "Optique":
              nodeOptique.push(
                {
                  title: element.id,
                  key: Math.floor(Math.random() * 1000000000) + 1,
                  expanded: false,
                  children: [
                    {
                      title: d[4],
                      key: Math.floor(Math.random() * 1000000000) + 1,
                      isLeaf: true
                    }
                  ]
                }
              );
              break;
            case "Hôpital":
              nodeHopital.push(
                {
                  title: element.id,
                  key: Math.floor(Math.random() * 1000000000) + 1,
                  expanded: false,
                  children: [
                    {
                      title: d[4],
                      key: Math.floor(Math.random() * 1000000000) + 1,
                      isLeaf: true
                    }
                  ]
                }
              );
              break;
            case "Dentaire":
              nodeDentaire.push(
                {
                  title: element.id,
                  key: Math.floor(Math.random() * 1000000000) + 1,
                  expanded: false,
                  children: [
                    {
                      title: d[4],
                      key: Math.floor(Math.random() * 1000000000) + 1,
                      isLeaf: true
                    }
                  ]
                }
              );
              break;
          }
        }
      }
    });
    if (nodeAutre.length > 0) {
      nodesSorted.push(
        {
          title: "Autre",
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodeAutre
        }
      );
    }
    if (nodeDentaire.length > 0) {
      nodesSorted.push(
        {
          title: "Dentaire",
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodeDentaire
        }
      );
    }
    if (nodePharmacie.length > 0) {
      nodesSorted.push(
        {
          title: "Pharmacie",
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodePharmacie
        }
      );
    }
    if (nodeHopital.length > 0) {
      nodesSorted.push(
        {
          title: "Hôpital",
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodeHopital
        }
      );
    }
    if (nodeOptique.length > 0) {
      nodesSorted.push(
        {
          title: "Optique",
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodeOptique
        }
      );
    }
    if (nodeMedecin.length > 0) {
      nodesSorted.push(
        {
          title: "Médecin",
          key: Math.floor(Math.random() * 1000000000) + 1,
          expanded: false,
          children: nodeMedecin
        }
      );
    }
    return nodesSorted;
  }
  fixDataNotSorted(year, month) {
    let d: string[] = [];
    //console.log("year : " + year +", Month : " +month);
    let nodesNotSorted = []
    this.documentParYearNotSorted.forEach(element => {
      d = element.srcFile.split("/");
      //console.log(d);
      //console.log(element);
      //console.log(element.month);
      if (element.year == year && element.month == month) {
        nodesNotSorted.push(
          {
            title: element.id,
            key: Math.floor(Math.random() * 1000000000) + 1,
            expanded: false,
            children: [
              {
                title: d[3],
                key: Math.floor(Math.random() * 1000000000) + 1,
                isLeaf: true
              }
            ]
          }
        );
      }
    });
    //console.log(nodesNotSorted);
    return nodesNotSorted;
  }
  isNumeric(num) {
    return isNaN(num)
  }
}

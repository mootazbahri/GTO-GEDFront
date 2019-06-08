import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {}

  logout() {
    this.router.navigate(['/']);
  }
}

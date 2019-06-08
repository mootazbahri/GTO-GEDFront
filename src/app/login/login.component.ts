import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AdministrateurGEDService } from 'src/service/administrateurGed.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private administrateurGedService: AdministrateurGEDService,
    private titleService: Title) {
    this.setTitle("GED - Login");
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    this.loading = true;
    this.loginAdmin();
  }
  loginAdmin(){
    var params = new HttpParams();
    params = params.set('login',this.loginForm.value.username);
    params = params.set('password',this.loginForm.value.password);
    this.administrateurGedService.login(params).subscribe(
      data => {
        console.log(data.length);
        if(data.length == 0 ) {}else{
          this.router.navigate(['/GED/accueil']);
        }
        console.log(JSON.parse(data));
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
}

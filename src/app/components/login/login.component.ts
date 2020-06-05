import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credential = { 'username': '', 'password': '' };
  private loggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // onSubmit()
  // {
  //   if(this.credential.username==='admin' && this.credential.password=='admin')
  //   {
  //     this.loggedIn=true;
  //     this.router.navigate(['addNewBook']);
  //   }
  // }

  onSubmit() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("XAuthToken", JSON.parse(JSON.stringify(res)).data);
        this.loggedIn = true;
        location.reload();
        console.log("Loggin Success");
      },
      error => {
        console.log(error);
      }
    )
  }
}


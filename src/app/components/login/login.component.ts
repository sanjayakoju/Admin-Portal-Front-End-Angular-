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
    this.loginService.checkSession().subscribe(
  		res => {
          // let token = response.headers.get("Authorization");  
  
          // localStorage.setItem("token" , token);  
        this.loggedIn=true;
        console.log(localStorage.getItem('XAuthToken'));
  		},
  		error => {
  			this.loggedIn=false;
  		}
  	);
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
        
        localStorage.setItem("XAuthToken",res.token);
        //sessionStorage.setItem("XAuthToken",JSON.stringify(res));
        console.log(JSON.parse(JSON.stringify(res)));
        //localStorage.setItem("xAuthToken", res.token);
        this.loggedIn = true;
        //location.reload();
        console.log("Loggin Success");
      },
      error => {
        console.log(error);
      }
    )
  }
}


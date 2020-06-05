import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  sendCredential(username: string, password: string)
  {
    let url="http://localhost:8080/token";
    let endcodedCredentials=btoa(username+":"+password);
    let basicHeader="Bearer "+endcodedCredentials;
    let headers=new Headers(
      {
        'Content-Type' : 'application/json',
        'Authorization' : basicHeader
      }
    );
    return this.http.post(url,{Headers:headers});
  }

  checkSession() {
    let url = "http://localhost:8080/checkSession";
    
    let headers = new Headers ({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url);
  }

  logout() {
    let url = "http://localhost:8080/user/logout";
    
    let headers = new Headers ({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '');
  }
}

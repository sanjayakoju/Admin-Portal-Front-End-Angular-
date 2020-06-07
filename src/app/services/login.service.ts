import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    let headers=new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'Authorization' : basicHeader
      }
    );
    return this.http.get<any>(url,{headers:headers});
  }

  checkSession() {
    let url = "http://localhost:8080/checkSession";
    
    let headers = new HttpHeaders ({
      'x-auth-token' : localStorage.getItem('XAuthToken')
    });

    return this.http.get(url,{headers:headers});
  }

  logout() {
    let url = "http://localhost:8080/user/logout";
    
    let headers = new HttpHeaders ({
      'x-auth-token' : localStorage.getItem('XAuthToken')
    });

    return this.http.post(url, '',{headers:headers});
  }
}

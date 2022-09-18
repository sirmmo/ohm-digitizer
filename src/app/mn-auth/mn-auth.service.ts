import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { MnDockerService } from '@modalnodes/mn-docker';
import { Observable, of } from 'rxjs';


@Injectable()
export class MnAuthService {
  userData: any;

  constructor(
    private http: HttpClient,
    private docker: MnDockerService
  ) { }

  getAuthHeaders() {
    let auth = new HttpHeaders();
    auth = auth.set('Authorization', 'JWT ' + window.localStorage.getItem('token'));
    return auth;
  }

  getUserData(): Observable<any> {
    if (this.userData) {
      return of(this.userData);
    } else {
      const auth = this.getAuthHeaders();
      // FIXME: default auth endpoint
      const endpoint = this.docker.getEnv('MN_AUTH_ENDPOINT') + '/auth/me/';
      const obsv = this.http.get(endpoint, { headers: auth });
      obsv.subscribe(data => this.userData = data);
      return obsv;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.docker.getEnv('MN_AUTH_ENDPOINT') + '/auth/jwt/create/',
      {
        username,
        password
      }
    );
  }

  resetPassword(email: string) {
    return this.http.post(this.docker.getEnv('MN_AUTH_ENDPOINT') + '/auth/password/reset/',
      {
        email
      }
    );
  }

  confirmPassword(uid: string, token: string, password: string) {
    return this.http.post(this.docker.getEnv('MN_AUTH_ENDPOINT') + '/auth/password/reset/confirm/',
      {
        uid,
        token,
        new_password: password
      }
    );
  }

  createUser(username, mail, password) {
    return this.http.post(this.docker.getEnv('MN_AUTH_ENDPOINT') + '/auth/users/create/',
      {
        username: username.toLowerCase(),
        email: mail.toLowerCase(),
        password
      }
    );
  }

  getParams(filter){
    let ret = '';
    for (const f in filter){
      console.log(f, filter[f]);
      ret = ret + f + '=' + filter[f] + '&';
    }
    console.log(ret);
    return ret;

  }

  setClaims(username, claims) {
    return this.http.post(this.docker.getEnv('MN_AUTH_ENDPOINT') + '/auth/users/setclaims/?' + this.getParams({
      username: username.toLowerCase(),
      claims: JSON.stringify(claims)
    }), '');
  }

  logout() {
    try{
      window.localStorage.removeItem('token');
    } catch (ex) {}
    try{
      window.localStorage.removeItem('user_data');
    } catch (ex) {}
    this.userData = undefined;
    window.location.href = this.docker.getEnv('MN_AUTH_POSTLOGOUT');
  }

  socialLogin(social: string) {
    const w = window.open(this.docker.getEnv('MN_AUTH_ENDPOINT') + 'login/' + social, 'login', 'width=700,height=400');
    window.addEventListener('message', (ev) => {
      const d = JSON.parse(ev.data);
      localStorage.setItem('user_data', JSON.stringify('user_data'));
      w.close();
    });
  }
}

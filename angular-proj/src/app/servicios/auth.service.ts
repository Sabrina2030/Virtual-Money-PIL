import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from '../../../../servicios/cliente.service';
import {HttpClient} from '@angular/common/http';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url="https://localhost:44350/api/login/authenticate";
  currentUserSubject: BehaviorSubject<LoginRequest>;
  currentUser: Observable<LoginRequest>;
  loggedIn= new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {
    console.log("AUTH SERVICE WORKING");
    this.currentUserSubject = new  BehaviorSubject<LoginRequest>(JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}'));
    // localStorage.getItem(TOKEN_KEY) --> te devuelve un string que corresponde al token, 
    // no un objeto completo que coincida con LoginRequest
    this.currentUser = this.currentUserSubject.asObservable();
    
 
  }

  login(usuario: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(this.url, usuario).pipe(map(data => {
      // localStorage.setItem(TOKEN_KEY, data.Token);
      if (data.Token)
      {
        localStorage.setItem(TOKEN_KEY, data.Token);
      }
                        
      this.currentUserSubject.next(data);
      this.loggedIn.next(true);
      return data;
    }));
  }

  get usuarioAutenticado(): LoginRequest {
    return this.currentUserSubject.value;
  }

  get estaAutenticado(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

   logOut(): void {
    window.sessionStorage.clear();
    localStorage.removeItem(TOKEN_KEY);
    this.loggedIn.next(false);
  }
}

 

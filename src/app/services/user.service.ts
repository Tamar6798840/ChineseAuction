import { Injectable } from '@angular/core';
import { Donors } from '../models/Donor.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: User[] = [];

  private callToGetUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetUser$: Observable<boolean> = this.callToGetUserSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  
  addUser(u:User):Observable<number>
  {
    
    let user = {
      id: u.userName,
      phone: u.phone,
      address:u.address
    };
  
    let url = 'http://localhost:5085/api/User';
    return this.http.post<number>(url, user)
  }
  



}

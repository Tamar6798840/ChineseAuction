import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Gifts } from '../models/Gifts.model';
import { User } from '../models/User.model';



@Injectable({
  providedIn: 'root'
})
export class GiftService {

  giftsList: Gifts[] = [];
  users: User[] = [];
  private callToGetGiftsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetGifts$: Observable<boolean> = this.callToGetGiftsSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  setGetGifts() {
    let flag = this.callToGetGiftsSubject.value;
    this.callToGetGiftsSubject.next(!flag);
  }
getGiftById (id:number): Observable<User[]>
{
  let url = 'http://localhost:5085/api/Gifts/'+id;
  return this.http.get<User[]>(url).pipe(map(l => this.users = l));
}

   getGifts(): Observable<Gifts[]> {
    let url = 'http://localhost:5085/api/Gifts';
    return  this.http.get<Gifts[]>(url).pipe(map(l => this.giftsList = l));
  }
  addGift(g:Gifts):Observable<number>
  {
    
    let gift = {
      id: g.id,
      name: g.name,
      donor: g.donor,
      price: g.price,
      img: g.img,
    };
  
    let url = 'http://localhost:5085/api/Gifts';
    return this.http.post<number>(url, gift)
  }
  update(g:Gifts):Observable<number>
  {
    let url = 'http://localhost:5085/api/Gifts/'+g.id;
    return this.http.put<number>(url, g)
  }
  delete(id:number){
      let url = 'http://localhost:5085/api/Gifts/' + id;
       return this.http.delete(url);
     }
  addCostumer(id:number,user: User):Observable<number>
  {
    let url = 'http://localhost:5085/api/Gifts/addCustomers/'+id;
     return this.http.put<number>(url, user)
  }
  }


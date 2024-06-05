import { Injectable } from '@angular/core';
import { Donors } from '../models/Donor.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  donorsList: Donors[] = [];

  private callToGetDonorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetDonors$: Observable<boolean> = this.callToGetDonorsSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  setGetDonors() {
    let flag = this.callToGetDonorsSubject.value;
    this.callToGetDonorsSubject.next(!flag);
  }

  getDonors(): Observable<Donors[]> {
    let url = 'http://localhost:5085/api/Donors';
    return this.http.get<Donors[]>(url).pipe(map(l => this.donorsList = l));
  }
  addDonor(d:Donors):Observable<number>
  {
    
    let gift = {
      id: d.id,
      name: d.name,
      address:d.address
    };
  
    let url = 'http://localhost:5085/api/Donors';
    return this.http.post<number>(url, gift)
  }
  update(g:Donors):Observable<number>
  {
    let url = 'http://localhost:5085/api/Donors/'+g.id;
    return this.http.put<number>(url, g)
  }
  delete(id:number){
      let url = 'http://localhost:5085/api/Donors/' + id;
       return this.http.delete(url);
     }



}

import { Component, OnInit } from '@angular/core';
import { Gifts } from '../../models/Gifts.model';
import { Router } from '@angular/router';
import { GiftService } from 'src/app/services/gift.service';
import { DonorService } from 'src/app/services/donor.service';
import { Donors } from 'src/app/models/Donor.model';
import { User } from 'src/app/models/User.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {


  gotoAddEdit: boolean = false;
  listGifts: Gifts[] = [];
  listDonors: Donors[] = [];
  productDialog: boolean = false;  
  submitted: boolean = false;
  winnerDialog: boolean = false;
  gift: Gifts = new Gifts();
  winner: User = new User();
  frmGift: FormGroup = new FormGroup({});
  
  constructor(private router: Router, private giftSrv: GiftService, private donorSrv: DonorService) {
    this.frmGift = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(10, [Validators.required, Validators.min(10)]),
      donor: new FormControl('',[Validators.required]),
      img:new FormControl('',[Validators.required])
    });
  }



  ngOnInit(): void {
    this.giftSrv.callToGetGifts$.subscribe(x => {
      this.giftSrv.getGifts().subscribe(lp => this.listGifts = lp);
    })
    this.donorSrv.callToGetDonors$.subscribe(x => {
      this.donorSrv.getDonors().subscribe(lp => this.listDonors = lp);

    })
  }
  addNewGift() {
      let res = false;
      let f=this.listGifts.filter(e=>this.gift.name==e.name)
      if (this.listGifts.filter(e=>this.gift.name==e.name).length!=0 && this.listGifts.length!=0)
        res = true;
      if (res)
        alert('מוצר קים!')
      else {
        let max = this.listGifts.map(l => l.id).sort().pop();
        this.gift.id = (max ?? 0) + 1;

        this.giftSrv.addGift(this.gift).subscribe(l => {

          this.giftSrv.setGetGifts();
          alert('המתנה נוספה בהצלחה ');
        },
          (message) => { alert('ארעה שגיאה ' + message.message) })

      }
    }

  
  delete(id: number) {
    this.giftSrv.delete(id).subscribe(res => {
      if (res) {
        this.giftSrv.setGetGifts();
      }
    })

  }
  goToAdd() {
    this.gotoAddEdit = !this.gotoAddEdit;
    this.gift = new Gifts;
    this.openNew();
  }
  goToedit(gift: Gifts) {
    this.frmGift = new FormGroup({
      name: new FormControl( gift.name, [Validators.required]),
      price: new FormControl(gift.price, [Validators.required, Validators.min(10)]),
      donor: new FormControl(gift.donor,[Validators.required]),
      img:new FormControl(gift.img,[Validators.required])
    });
    this.gotoAddEdit = !this.gotoAddEdit;
    this.gift = gift;

    this.openNew()
  }

  edit() {
    this.giftSrv.update(this.gift).subscribe(l => {

      this.giftSrv.setGetGifts();

    }, (message) => { alert('ארעה שגיאה ' + message.message) })

  }
  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }
  hideDialog() {
    this.frmGift = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(10, [Validators.required, Validators.min(10)]),
      donor: new FormControl('',[Validators.required]),
      img:new FormControl('',[Validators.required])
    });
    this.productDialog = false;
    this.submitted = false;
  }
  saveProduct() {
    if (this.frmGift.valid) {
      this.gift.name = this.frmGift.controls['name'].value;
      this.gift.donor = this.frmGift.controls['donor'].value;
      this.gift.price = this.frmGift.controls['price'].value;
      this.gift.img = this.frmGift.controls['img'].value;
    if (this.gift.id == null)
      this.addNewGift();
    else
      this.edit() 
    
    this.hideDialog()
    }
  }
  goToHome() {
    this.router.navigate([''])
  }
  random(gift: Gifts) { 
    gift.IsRandom=true;
    let i =Math.floor(Math.random() * (gift.customers.length) );
    this.winner = gift.customers[i];
    this.winnerDialog = !this.winnerDialog

  }
  goToBasket(){
    this.router.navigate(['basket'])
  }
 
  goToDonor(){
    this.router.navigate(['donor'])
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gifts } from 'src/app/models/Gifts.model';
import { User } from 'src/app/models/User.model';
import { GiftService } from 'src/app/services/gift.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  listGifts: Gifts[] = [];
  sum: number = 0;

  userDialog: boolean = false;
  submitted: boolean = false;
  numUser: number = 1212;
  fromPay: boolean = false;

  frmUser: FormGroup = new FormGroup({});

  constructor(private router: Router, private giftService: GiftService, private userService: UserService) { }
  ngOnInit(): void {
    let basket = sessionStorage.getItem("basket");
    if (basket != null)
      this.listGifts = JSON.parse(basket)
    for (let i = 0; i < this.listGifts.length; i++) {
      this.sum += this.listGifts[i].price;
    }
    this.userDialog = true

    this.frmUser = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      phone: new FormControl('', [Validators.required]),

      creditCard: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      date: new FormControl(new Date, [Validators.required]),
      num: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    });

  }


  pay() {
    let user = new User();
    user.address = this.frmUser.controls['address'].value;
    user.userName = this.frmUser.controls['userName'].value;
    user.phone = this.frmUser.controls['phone'].value;

    for (let i = 0; i < this.listGifts.length; i++) {
      this.giftService.addCostumer(this.listGifts[i].id, user).subscribe()
    }
    this.userDialog = false;
    this.numUser = this.numUser++;
    this.fromPay = true
  }
  goToHome() {
    this.router.navigate([''])
  }
  goToDonor() {
    this.router.navigate(['donor'])
  }
  goToGift() {
    this.router.navigate(['gift'])

  }
  goToBasket() {
    if (!this.fromPay)
      this.router.navigate(['basket'])
  }
}

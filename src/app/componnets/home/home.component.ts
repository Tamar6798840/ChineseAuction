import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gifts } from 'src/app/models/Gifts.model';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listGifts: Gifts[] = [];
  basket:Gifts[]=[]

  constructor(private router: Router, private giftSrv: GiftService) { }
  ngOnInit(): void {
    this.giftSrv.callToGetGifts$.subscribe(x => {
      this.giftSrv.getGifts().subscribe(lp => this.listGifts = lp);
    })

  }

  addGiftToBasket(gift: Gifts) {
    this.basket.push(gift)
    sessionStorage.setItem("basket" , JSON.stringify(this.basket));
  }
  goToBasket()
  {
    this.router.navigate(['basket'])
  }

goToGift()
  {
    this.router.navigate(['gift'])
  }
  goToDonor()
  {
    this.router.navigate(['donor'])
  }
}

  


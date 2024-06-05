import { Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Gifts } from 'src/app/models/Gifts.model';
import { GiftService } from 'src/app/services/gift.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, DoCheck {
  fullListGiftft: Gifts[] = [];
  b:number=0
  listGifts: Gifts[] = [];
  sum: number = 0;
  basket: Gifts[] = [];
  len: number = 0;


  constructor(private router: Router, private giftSrv: GiftService) { }
  ngDoCheck(): void {
      
    this.calculate()

    // if(this.len!=this.listGifts.length)
    // {
     
      
    //   this.calculate()
    //   this.listGifts = [...this.fullListGiftft]
    //   this.len=this.listGifts.length
    // }
      
  }
 
 
//    MyController($scope) {

//     $scope.basket = 1;

//     $scope.$watch('myVar', function() {
//         alert('hey, myVar has changed!');
//     });

//     $scope.buttonClicked = function() {
//         $scope.myVar = 2; // This will trigger $watch expression to kick in
//     };
// }


   ngOnInit() {
     this.giftSrv.callToGetGifts$.subscribe(x => {      
        this.giftSrv.getGifts().subscribe(lp => {this.listGifts = lp; console.log("gg");
        }
      )
    })
    
    // this.len=this.listGifts.length
    // this.fullListGiftft = this.listGifts
    // console.log(this.listGifts);
    
  }



  goToPay() {
    sessionStorage.setItem("basket", JSON.stringify(this.basket));
    this.router.navigate(['pay'])
  }
  goToHome() {
    this.router.navigate([''])
  }
  calculate() {
    this.sum = 0;
    for (let i = 0; i < this.basket.length; i++) {
      this.sum += this.basket[i].price;
    }

  }
  goToDonor() {
    this.router.navigate(['donor'])
  }
  goToGift() {
    this.router.navigate(['gift'])

  }
  goTopPay() {
    this.router.navigate(['pay'])

  }

}












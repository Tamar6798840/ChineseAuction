import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftComponent } from './componnets/gift/gift.component';

import { DonorsComponent } from './componnets/donors/donors.component';
import { PayComponent } from './componnets/pay/pay.component';
import { BasketComponent } from './componnets/basket/basket.component';

import { HomeComponent } from './componnets/home/home.component';

const routes: Routes = [


  { path: '', component: HomeComponent },
  { path: 'gift', component: GiftComponent },
  { path: 'donor', component: DonorsComponent },
  { path: 'pay', component: PayComponent },
  { path: 'basket', component: BasketComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

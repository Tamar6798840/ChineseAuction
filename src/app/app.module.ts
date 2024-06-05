import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from 'src/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiftComponent } from './componnets/gift/gift.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import {PickListModule} from 'primeng/picklist';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketComponent } from './componnets/basket/basket.component';
import { PayComponent } from './componnets/pay/pay.component';
import { DonorsComponent } from './componnets/donors/donors.component';
import { HomeComponent } from './componnets/home/home.component';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessageModule} from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    GiftComponent,
    ModalComponent,
    BasketComponent,
    PayComponent,
    DonorsComponent,
    HomeComponent,
    

  ],
  imports: [
    MessageModule,
    ToastModule,
    PickListModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    FileUploadModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ImageModule ,
    InputMaskModule,
KeyFilterModule

    
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donors } from 'src/app/models/Donor.model';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css'],
  providers: [MessageService]
})
export class DonorsComponent {
  gotoAddEdit: boolean = false;
  listDonors: Donors[] = [];
  donorDialog: boolean = false;
  donorToUpdate: Donors = new Donors();
  submitted: boolean = false;
  donor: Donors = new Donors();
  constructor(private router: Router, private Donorsrv: DonorService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.Donorsrv.callToGetDonors$.subscribe(x => {
      this.Donorsrv.getDonors().subscribe(lp => this.listDonors = lp);

    })
  }
  addNewDonor(gift: Donors) {
    let res = false;
    this.listDonors.forEach(element => {
      if (element.name == gift.name) {
        res = true;
      }
    });
    if (res)
      alert('מוצר קים!')
    else {
      let max = this.listDonors.map(l => l.id).sort().pop();
      gift.id = (max ?? 0) + 1;

      this.Donorsrv.addDonor(gift).subscribe(l => {

        this.Donorsrv.setGetDonors()
        alert('נוסף אדם עם תעודת זהות ' + l);
      },
        (message) => { alert('ארעה שגיאה ' + message.message) })

    }
  }
  delete(id: number) {
    this.Donorsrv.delete(id).subscribe(res => {
      if (res) {
        this.Donorsrv.setGetDonors();
      }
    })

  }
  confirm(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the donor and the gifts that he contributed?',
       
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.delete(id),
      
    });
  }
  goToAdd() {

    this.gotoAddEdit = !this.gotoAddEdit;
    this.donor = new Donors;
    this.openNew()

  }
  goToedit(gift: Donors) {
    this.donorToUpdate = gift

    this.gotoAddEdit = !this.gotoAddEdit;
    this.donor = gift;
    debugger
    this.openNew()
  }

  onUpload(g: any) {

  }
  edit(gift: Donors) {
    this.Donorsrv.update(gift).subscribe(l => {

      this.Donorsrv.setGetDonors();

    },
      (message) => { alert('ארעה שגיאה ' + message.message) })

  }
  openNew() {
    this.submitted = false;
    this.donorDialog = true;
  }
  hideDialog() {
    this.donorDialog = false;
    this.submitted = false;
  }
  saveDonor() {
    if (this.donor.id == null)
      this.addNewDonor(this.donor);
    else
      this.edit(this.donor)
    this.hideDialog()
  }
  goToHome() {
    this.router.navigate([''])
  }
  goToBasket() {
    this.router.navigate(['basket'])
  }
  goToGift() {
    this.router.navigate(['gift'])
  }
}

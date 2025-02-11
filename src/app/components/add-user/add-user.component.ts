import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
userData: FormGroup = new FormGroup({
  name : new FormControl('', [
    Validators.required, Validators.minLength(3)

  ]
),

birthDate  : new FormControl(''),

age  : new FormControl('', [
    Validators.min(18), Validators.max(50),


  ]
),

  gender : new FormControl(''),
  job : new FormControl(''),
  address : new FormControl(''),
  phoneNumber : new FormControl('',
     [
      // Validators.maxLength(10),
      //  Validators.minLength(10),
        Validators.required,
    Validators.pattern(/^[0-9]{11}$/)

  ])
})

  showToast: boolean = false;

  constructor(private userService: UserService, private router: Router, private _Location: Location) {}

  isSubmitEnabled(): boolean{
    return (this.userData.get('name')?.valid ?? false) &&
    (this.userData.get('phoneNumber')?.valid ?? false);
  }

  onSubmit(): void {
 // If form is invalid, do not proceed
    if (this.userData.invalid) {
      return;
    }

    console.log(this.userData.value);
    this.userService.addUser(this.userData.value).subscribe(() => {
      this.showToast = true;
      setTimeout(() => {
      this.showToast = false;

        this.router.navigate(['']);
      }, 2000);
    });
  }

  goBack(): void {
    this._Location.back();
  }



}

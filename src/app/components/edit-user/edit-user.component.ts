import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  user: User | null = null;
  userData: FormGroup = new FormGroup({
    name: new FormControl(this.user?.name || '', [
      Validators.required, Validators.minLength(3)

    ]
    ),

    birthDate: new FormControl(this.user?.birthDate ||  ''),

    age: new FormControl(this.user?.age || '', [
      Validators.min(18), Validators.max(50)
    ]
    ),

    gender: new FormControl( this.user?.gender || ''),
    job: new FormControl(this.user?.job || ''),
    address: new FormControl( this.user?.address || ''),
    phoneNumber : new FormControl(this.user?.phoneNumber || '',
      [
       // Validators.maxLength(10),
       //  Validators.minLength(10),
         Validators.required,
       Validators.pattern(/^[0-9]{11}$/)

   ])
  })

  showToast: boolean = false;
  userId: any

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _Location: Location) { }


  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userData.patchValue({...user, birthDate: new DatePipe('en-US').transform(user.birthDate, 'yyyy-MM-dd')});
      // this.userData.patchValue({...user, birthDate: new DatePipe('ar-EG').transform(user.birthDate, 'dd-MM-yyyy')});

    })


  }

  isSubmitEnabled(): boolean{
    return (this.userData.get('name')?.valid ?? false) &&
    (this.userData.get('phoneNumber')?.valid ?? false);
  }


  onSubmit(): void {
    if (this.userData.valid) {


        this.userService.updateUser(this.userId, this.userData.value).subscribe(() => {
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
            this.router.navigate(['']);
          }, 2000);
        });


      // else {
      //   this.userService.addUser(this.userData.value).subscribe(() => {
      //     this.showToast = true;
      //     setTimeout(() => {
      //       this.showToast = false;
      //       this.router.navigate(['']);
      //     }, 2000);
      //   });
      // }
    }
  }

  goBack(): void {
    this._Location.back();
  }



}

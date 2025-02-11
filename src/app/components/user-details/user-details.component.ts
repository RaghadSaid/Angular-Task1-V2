import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  constructor(private _UserService: UserService, private route:ActivatedRoute , private _Location: Location) {}

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    if(id){
    this._UserService.getUserById(id).subscribe((data) => {
      this.user = data;
    });
  }
}

  goBack(): void {
    this._Location.back();
  }
}

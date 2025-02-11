import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-favorite-users',
  templateUrl: './favorite-users.component.html',
  styleUrl: './favorite-users.component.css',
})
export class FavoriteUsersComponent {
  favoriteUsers: User[] = [];
  constructor(private userService: UserService, private _Location: Location, private router:Router) {}
  // ngOnInit(): void {
  //   this.userService.getUsers().subscribe((users) => {
  //     this.favoriteUsers = users.filter(
  //       (user: { isFavorite: any }) => user.isFavorite
  //     );
  //   });
  // }
  users: User[] = [];
  updateUser: any;
  showToast: boolean = false;



  ngOnInit(): void {
    this.loadFavoriteUsers();
  }

  loadFavoriteUsers(): void {
    this.userService.getUsers().subscribe((users:User[]) => {
      this.favoriteUsers = users.filter(
        (user => user.isFavorite)
      );
    });
  }

  goBack(): void {
    this._Location.back();
  }


  getUsers(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
    toggleFavorite(user: User){
      this.userService.toggleFavorite(user).subscribe(()=>{
        this.loadFavoriteUsers();
      })
      return this.updateUser(user);
    }

    deleteUser(userId:number):void{
      if(confirm('Are you sure you want to delete this user?')){
        this.userService.deleteUser(userId).subscribe(()=>{
          this.loadFavoriteUsers();
          // this.users = this.users.filter((user) => user.id !== userId);
          this.showToast = true;
        })
    }
}

editUser(userId: any): void {
  this.router.navigate(['/edit-user', userId]);
}
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  updateUser: any;
  showToast: boolean = false;
  constructor(private userService: UserService) {}
  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();

  }
getUsers(): void {
  this.userService.getUsers().subscribe((data: any) => {
    this.users = data;
  });
}
  toggleFavorite(user: User){
    this.userService.toggleFavorite(user).subscribe(()=>{
      this.getUsers();
    })
    return this.updateUser(user);
  }

  deleteUser(userId:number):void{
    if(confirm('Are you sure you want to delete this user?')){
      this.userService.deleteUser(userId).subscribe(()=>{
        this.getUsers();
        // this.users = this.users.filter((user) => user.id !== userId);
        this.showToast = true;
      })
  }

  // calculateBithDate(age:number):string{
  //   const today = new Date();
  //   const birthYear = today.getFullYear()-age;
  //   return `${birthYear}-01-01`;
  // }
}
}

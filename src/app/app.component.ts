import { Component } from '@angular/core';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'Angular-Task1';

  users: any[] = [];
  constructor(private userService: UserService) {}
}

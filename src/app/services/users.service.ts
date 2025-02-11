import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserById(id:any):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`);

  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id:number, user: User): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(userId:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  toggleFavorite(user: User):Observable<any>{
    user.isFavorite = !user.isFavorite;
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }
}

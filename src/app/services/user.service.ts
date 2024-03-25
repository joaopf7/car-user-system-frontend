import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/users/${id}`);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/users`);
  }

  create(tecnico: User): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/users`, tecnico);
  }

  update(tecnico: User): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/users/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<User> {
    return this.http.delete<User>(`${API_CONFIG.baseUrl}/users/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Car> {
    return this.http.get<Car>(`${API_CONFIG.baseUrl}/cars/${id}`);
  }

  findAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${API_CONFIG.baseUrl}/cars`);
  }

  create(car: Car): Observable<Car> {
    return this.http.post<Car>(`${API_CONFIG.baseUrl}/cars`, car);
  }

  update(car: Car): Observable<Car> {
    return this.http.put<Car>(`${API_CONFIG.baseUrl}/cars/${car.id}`, car);
  }
}

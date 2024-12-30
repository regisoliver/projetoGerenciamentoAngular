import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUsers(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  deleteUsers(ids: number[]): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { body: ids });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

}

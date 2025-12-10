import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private cache: User[] | null = null;
  private cacheTime: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 segundos

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const now = Date.now();
    
    // Retornar caché si es válido
    if (this.cache && (now - this.cacheTime) < this.CACHE_DURATION) {
      return of(this.cache);
    }
    
    // Obtener datos frescos y actualizar caché
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => {
        this.cache = users;
        this.cacheTime = now;
      })
    );
  }

  clearCache() {
    this.cache = null;
    this.cacheTime = 0;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    this.clearCache(); // Invalidar caché al crear
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    this.clearCache(); // Invalidar caché al actualizar
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    this.clearCache(); // Invalidar caché al eliminar
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/active`);
  }
}

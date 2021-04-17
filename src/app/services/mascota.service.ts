import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota } from '../models/mascota';
import { Tipomascota } from '../models/tipomascota';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private urlEndPoint: string = 'http://localhost:8090/api/mascotas';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8090',
    'Access-Control-Allow-Credentials': 'true',
    GET: 'POST',
  });

  constructor(private http: HttpClient) { }

  getMascotas(): Observable<Mascota[]> {
    //return of();
    //return this.http.get<Usuario[]>(this.urlEndPoint);
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((data) => data as Mascota[]));
  }

  getMascota(id): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.urlEndPoint}/${id}`);
  }

  insert(obj: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.urlEndPoint, obj, {
      headers: this.httpHeaders,
    });
  }

  update(obj: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(
      `${this.urlEndPoint}/${obj.idmascota}`,
      obj,
      { headers: this.httpHeaders }
    );
  }

  delete(id: number): Observable<Mascota> {
    return this.http.delete<Mascota>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  getTipoMascota(): Observable<Tipomascota[]> {
    return this.http.get<Tipomascota[]>(`${this.urlEndPoint}/tipomascota`);
  }

}

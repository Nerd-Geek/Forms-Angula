import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Country } from '../types/api';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises() {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/lang/spa')
  }
}

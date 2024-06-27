import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    constructor(private http: HttpClient) {}

    private apirUrl: string = 'https://restcountries.com/v3.1';
    private getCountryRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url).pipe(
            catchError((error) => of([])),
            // delay(1000)
        );
    }

    // searchCapital(term: string): Observable<Country[]> {
    //     return this.http.get<Country[]>(`${this.apirUrl}/capital/${term}`).pipe(
    //         // map( countries => countries.length > 0 ? [] : countries)
    //         catchError((error) => of([]))
    //     );
    // }

    searchCapital(term: string): Observable<Country[]> {
        return this.getCountryRequest(`${this.apirUrl}/capital/${term}`);
    }

    searchPais(term: string): Observable<Country[]> {
        return this.getCountryRequest(`${this.apirUrl}/name/${term}`);
    }

    searchByRegion(term: string): Observable<Country[]> {
        return this.getCountryRequest(`${this.apirUrl}/region/${term}`);
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.apirUrl}/alpha/${code}`).pipe(
            map((countries) => (countries.length > 0 ? countries[0] : null)),
            catchError((error) => of(null))
        );
    }
}

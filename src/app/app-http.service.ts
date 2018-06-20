import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {
  public baseUrl = 'https://restcountries.eu/rest/v2';
  public regionCodes = [
    { code: '002', name: 'Africa' },
    { code: '150', name: 'Europe' },
    { code: '019', name: 'Americas' },
    { code: '142', name: 'Asia' },
    { code: '009', name: 'Oceania' }
  ];


  constructor(private _http: HttpClient) { }

  // service to get countries of a region

  public getRegionDetails = (region): Observable<any> => {
    const url = this.baseUrl + '/region/' + region + '?fields=name;capital;languages;flag';
    const response = this._http.get(url);
    return response;
  }
  // service to get details of a country

  public getCountryDetails = (name): Observable<any> => {
    const url = this.baseUrl + '/name/' + name + '?fullText=true';
    const response = this._http.get(url);
    return response;

  }
  // service to get countries with a language

  public getCountryByLanguage = (lan): Observable<any> => {
    const url = this.baseUrl + '/lang/' + lan + '?fields=name;capital;languages;flag;region';
    console.log(url);
    const response = this._http.get(url);

    return response;
  }

    // service to get countries with a currency

  public getCountryByCurrency = (cur): Observable<any> => {
    const url = this.baseUrl + '/currency/' + cur + '?fields=name;capital;languages;flag;region';
    const response = this._http.get(url);
    return response;

  }

  private handleError = (err: HttpErrorResponse) => {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    } // end condition *if
    console.error(errorMessage);
    return Observable.throw(errorMessage);

  }
}

import { Injectable } from '@angular/core';
import { Poi } from './poi';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoiService {

  private poisUrl = '/api/1/aroundme';  // URL to web api
  private poiUrl = '/api/1/poi/';  // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a message with the MessageService */
  private log(message: string) {
    console.log(message);
    this.messageService.setMessage(message);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`Impossible de récupérer les POIs`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   *
   */
  getPois() {
    this.log(`Récupération des POIs`);
    return this.http
      .get<Poi[]>(this.poisUrl)
      .pipe(
        catchError(this.handleError([]))
      );
  }
  /**
   *
   */
  getPoi(id: string) {
    this.log(`Récupération du POI ${id}`);
    return this.http
      .get<Poi>(this.poiUrl + id)
      .pipe(
        catchError(this.handleError())
      );
  }
}

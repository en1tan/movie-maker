import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMovieData, IMovieDetails } from '../app/app.component';


interface IResponseData {
  status: boolean;
  message: string;
  data: IMovieDetails
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl = "https://straedog-movie-server.herokuapp.com";

  constructor(private http: HttpClient) { }

  saveMovie(movieData: IMovieData): Observable<IResponseData> {
    return this.http.post<IResponseData>(`${this.apiUrl}/save`, movieData).pipe(
      tap()
    )
  }

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`).pipe(
      tap()
    )
  }

}

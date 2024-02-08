import { Injectable } from '@angular/core';
import {IBookRequest, IBookResponse, IGenreResponse} from "../../models/auth.model";
import {apiEndpoint} from "../../constants/constants";
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) {
  }
  postGenre(genre: any) {
    return this.http.post<Object>(apiEndpoint.GenreEndpoint.genre, genre);
  }

  fetchGenres() {
    return this.http.get<any>(apiEndpoint.GenreEndpoint.genre)
        .pipe(
            map((res) => {
              return res.content;
            }), catchError((err) => {
              return throwError(() => err);
            })
        );
  }

}


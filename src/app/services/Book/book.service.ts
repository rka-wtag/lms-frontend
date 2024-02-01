import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../constants/constants";
import {catchError, map, throwError} from "rxjs";
import {IBookResponse} from "../../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private http: HttpClient) { }

  fetchBooks() {
    return this.http.get<any>(apiEndpoint.BookEndpoint.book)
        .pipe(
            map((res) => {
              return res.content;
            }), catchError((err) => {
                return throwError(() => err);
            })
        );
  }

}

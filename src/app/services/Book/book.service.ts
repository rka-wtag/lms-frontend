import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../constants/constants";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

    loadBook: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

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

  updateBook(id: number, updatedBook: Object){
      return this.http.put(apiEndpoint.BookEndpoint.getUpdateBook(id), updatedBook);
  }

  fetchBook(id: number) {
      return this.http.get(apiEndpoint.BookEndpoint.getBook(id))
          .pipe(
              catchError(err => throwError(() => err))
          )
  }

  deleteBook(id: number) {
      return this.http.delete(apiEndpoint.BookEndpoint.getDeleteBook(id))
          .pipe(
              catchError(err => throwError(() => err))
          )
  }

    saveBook(bookTobeSaved) {
        return this.http.post<Object>(apiEndpoint.BookEndpoint.book, bookTobeSaved);
    }
}

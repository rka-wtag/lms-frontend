import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiEndpoint} from "../../constants/constants";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private  http: HttpClient) { }

  fetchAuthors() {
    return this.http.get<any>(apiEndpoint.AuthorEndpoint.author)
        .pipe(
            map((res) => {
              return res.content;
            }), catchError((err) => {
              return throwError(() => err);
            })
        );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiEndpoint} from "../../constants/constants";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {IAuthorRequest, IAuthorResponse, PaginationInput} from "../../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    loadAuthors: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private http: HttpClient) {
    }

    fetchAuthors(paginationInput: PaginationInput) {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('pageNo', paginationInput.pageNo);
        httpParams = httpParams.append('pageSize', paginationInput.pageSize);
        httpParams = httpParams.append('sortingField', paginationInput.sortingField);
        return this.http.get<any>(apiEndpoint.AuthorEndpoint.author, {params: httpParams})
            .pipe(
                map((res) => {
                    return res.content;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    fetchAuthorsAlternate() {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('pageNo', 0);
        httpParams = httpParams.append('pageSize', 1000);
        httpParams = httpParams.append('sortingField', 'id');
        return this.http.get<any>(apiEndpoint.AuthorEndpoint.author, {params: httpParams})
            .pipe(
                map((res) => {
                    return res.totalElements;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    fetchAuthor(id: number) {
        return this.http.get<any>(apiEndpoint.AuthorEndpoint.getAuthor(id))
            .pipe(
                map((res) => {
                    return res;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    saveAuthor(author: IAuthorRequest) {
        return this.http.post<any>(apiEndpoint.AuthorEndpoint.author, author)
            .pipe(
                map(res => res.content)
            )
    }

    updateAuthor(currentAuthorID: number, author: IAuthorRequest) {
        return this.http.put<any>(apiEndpoint.AuthorEndpoint.getUpdateAuthor(currentAuthorID), author)
            .pipe(
                map((res) => {
                    return res;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }
    deleteAuthor(id: number) {
        return this.http.delete(apiEndpoint.AuthorEndpoint.getDeleteAuthor(id))
            .pipe(
                catchError(err => throwError(() => err))
            )
    }
}

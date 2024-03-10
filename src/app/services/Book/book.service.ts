import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiEndpoint} from "../../constants/constants";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {IssueBookRequest, PaginationInput} from "../../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    loadBook: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private http: HttpClient) {
    }

    fetchBooks(paginationInput: PaginationInput) {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('pageNo', paginationInput.pageNo);
        httpParams = httpParams.append('pageSize', paginationInput.pageSize);
        httpParams = httpParams.append('sortingField', paginationInput.sortingField);
        return this.http.get<any>(apiEndpoint.BookEndpoint.book, {params: httpParams})
            .pipe(
                map((res) => {
                    return res.content;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    fetchBooksAlternate() {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('pageNo', 0);
        httpParams = httpParams.append('pageSize', 1000);
        httpParams = httpParams.append('sortingField', 'id');
        return this.http.get<any>(apiEndpoint.BookEndpoint.book, {params: httpParams})
            .pipe(
                map((res) => {
                    return res.totalElements;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    updateBook(id: number, updatedBook: Object) {
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

    saveBook(bookTobeSave: Object) {
        return this.http.post<Object>(apiEndpoint.BookEndpoint.book, bookTobeSave);
    }

    issueBook(id: number){
        let bookDto: IssueBookRequest  = {
            bookId: id
        }
        return this.http.post(apiEndpoint.BookEndpoint.issueBook, bookDto);
    }
}

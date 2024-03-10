import {Injectable} from '@angular/core';
import {IBookRequest, IBookResponse, IGenreResponse, PaginationInput} from "../../models/auth.model";
import {apiEndpoint} from "../../constants/constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenreService {

    loadGenre: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private http: HttpClient) {
    }

    postGenre(genre: any) {
        return this.http.post<Object>(apiEndpoint.GenreEndpoint.genre, genre);
    }

    updateGenre(id: number, genre: any) {
        console.log(id);
        return this.http.put<Object>(apiEndpoint.GenreEndpoint.getUpdateGenre(id), genre);
    }


    fetchGenres(paginationInput: PaginationInput) {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('pageNo', paginationInput.pageNo);
        httpParams = httpParams.append('pageSize', paginationInput.pageSize);
        httpParams = httpParams.append('sortingField', paginationInput.sortingField);
        return this.http.get<any>(apiEndpoint.GenreEndpoint.genre, {params: httpParams})
            .pipe(
                map((res) => {
                    return res.content;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    fetchGenresAlternate() {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('pageNo', 0);
        httpParams = httpParams.append('pageSize', 1000);
        httpParams = httpParams.append('sortingField', 'id');
        return this.http.get<any>(apiEndpoint.GenreEndpoint.genre, {params: httpParams})
            .pipe(
                map((res) => {
                    return res.totalElements;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }


    fetchGenre(id: number) {
        return this.http.get<any>(apiEndpoint.GenreEndpoint.getGenre(id))
            .pipe(
                map((res) => {
                    return res;
                }), catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    deleteGenre(id: number) {
        return this.http.delete(apiEndpoint.GenreEndpoint.getDeleteGenre(id))
            .pipe(
                catchError(err => throwError(() => err))
            )
    }

}


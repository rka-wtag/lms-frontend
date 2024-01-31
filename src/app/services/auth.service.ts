import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ILogin, ILoginResponse, IRegistrationResponse} from '../models/auth.model';
import {apiEndpoint} from '../constants/constants'
import {map} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    onLogin(data: ILogin) {
        return this.http
            .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
            .pipe(
                map((response) => {
                    if (response) {
                        this.tokenService.setToken(response.accessToken);
                    }
                    return response;
                })
            );
    }

    onRegistration(data: ILogin) {
        return this.http.post<IRegistrationResponse>(`${apiEndpoint.AuthEndpoint.registration}`, data)
    }

    onLogout() {
        this.tokenService.removeToken();
    }
}
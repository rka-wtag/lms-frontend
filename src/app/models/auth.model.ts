
export interface ILogin {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IRegistrationResponse {
    message: string
}
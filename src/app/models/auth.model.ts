
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

export interface IAuthorResponse {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
}

export interface IssueBookRequest {
    bookId: number;
}

export interface IAuthorRequest {
    lastName: string;
    firstName: string;
    email: string;
}

export interface IGenreResponse {
    id: number;
    name: string;
}

export interface IBookResponse {
    id: number;
    title: string;
    publicationYear: number;
    copiesAvailable: number;
    author: {
        id: number;
        lastName: string;
        firstName: string;
        email: string;
    };
    genres: IGenreResponse[];
}

export interface IBookRequest {
    title: string;
    publicationYear: number;
    copiesAvailable: number;
    authorId: number;
    genreIds: number[];
}

export interface Book {
    id: number;
    title: string;
    author: IAuthorResponse;
    genres: IGenreResponse[];
}

export interface PaginationInput {
    pageNo: number,
    pageSize: number,
    sortingField: string
}
export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:8080';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiUrl}/login`,
        registration: `${apiUrl}/registration`,
        logout: `${apiUrl}/logout`
    },
    BookEndpoint: {
        book: `${apiUrl}/books`,
        getDeleteBook: (id: number) => `${apiUrl}/books/${id}`,
        getBook: (id: number) => `${apiUrl}/books/${id}`,
        getUpdateBook: (id: number) => `${apiUrl}/books/${id}`,
        issueBook: `${apiUrl}/issued-books`
    },
    GenreEndpoint: {
        genre: `${apiUrl}/genres`,
        getUpdateGenre: (id: number) => `${apiUrl}/genres/${id}`,
        getGenre: (id: number) => `${apiUrl}/genres/${id}`,
        getDeleteGenre: (id: number) => `${apiUrl}/genres/${id}`,
    },
    AuthorEndpoint: {
        author: `${apiUrl}/authors`,
        getUpdateAuthor: (id: number) => `${apiUrl}/authors/${id}`,
        getAuthor: (id: number) => `${apiUrl}/authors/${id}`,
        getDeleteAuthor: (id: number) => `${apiUrl}/authors/${id}`
    },
    IssuedBookEndpoint: {
        getIssuedBooks: `${apiUrl}/issued-books`,
        getReturnBook: (id: number) => `${apiUrl}/issued-books/${id}`
    }
};
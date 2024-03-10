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
        getDeleteBook: (id: number) => `${apiUrl}/books/${id}`
    },
    GenreEndpoint: {
        genre: `${apiUrl}/genres`
    }
};

export const Urls = {
    showBooks: "/showBooks",
    showGenres: "/showGenres",
    showAuthors: "/showAuthors",
    showIssuedBooks: "/showIssuedBooks",
}

export const regexPattern = {
    number: {pattern: `/^[1-9]\\d*$/`}
};
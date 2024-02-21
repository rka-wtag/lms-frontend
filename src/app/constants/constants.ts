export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:8080';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiUrl}/login`,
        registration: `${apiUrl}/registration`,
        logout: `${apiUrl}/logout`
    }
};

export const Urls = {
    showBooks: "/showBooks",
    showGenres: "/showGenres",
    showAuthors: "/showAuthors",
    showIssuedBooks: "/showIssuedBooks",
}
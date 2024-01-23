export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:8080';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiurl}/login`,
        registration: `${apiurl}/registration`,
        logout: `${apiurl}/logout`
    }
};
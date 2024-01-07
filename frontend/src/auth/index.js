import AuthService from "./auth.service";

const authSvc = new AuthService();

export const Auth = {
    authSvc,
};
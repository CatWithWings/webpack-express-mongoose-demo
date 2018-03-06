import { ENV } from './env';

export const USER = {
    VAILD_EMAIL: ENV.DEFAULT + '/user/register/valid_email',
    GET_KEY: ENV.DEFAULT+'/user/get_key',
    REGISTER: ENV.DEFAULT+'/user/register',
    LOGIN: ENV.DEFAULT+'/user/login',
    LOGOUT: ENV.DEFAULT+'/user/logout',
}
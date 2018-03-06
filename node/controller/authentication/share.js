const REGISTER_ROUTER = '/user/register';
const LOGIN_ROUTER = '/user/login';
const AUTHENTICATION_ROUTER = '/error/401';

module.exports = {
    // MAX_TIME_LIMIT : 60000, // 有效期(1分钟)
    MAX_TIME_LIMIT : 28800000, // 有效期(8小时)
    REGISTER_ROUTER : REGISTER_ROUTER,
    LOGIN_ROUTER : LOGIN_ROUTER,
    AUTHENTICATION_ROUTER : AUTHENTICATION_ROUTER,
    HOME_ROUTER : '/monitor/home',
    ELIMINATE : {
        GET_PUB_KEY: '/api/user/get_key',
        VALID_EAMIL: '/api/user/register/valid_email',
        EXEC_EGISTER: '/api/user/register',
        EXEC_LOGIN: '/api/user/login',
        LOGIN_ROUTER: LOGIN_ROUTER,
        REGISTER_ROUTER: REGISTER_ROUTER,
        AUTHENTICATION_ROUTER: AUTHENTICATION_ROUTER,
    },
}
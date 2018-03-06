import juicer from 'juicer';
import mainNavTpl from './main_nav.component';
import UtilRequire from '../../util/util.require';
import { USER } from '../../server/user';
import logo from '../../../../static/img/logo.png';
import portrait from '../../../../static/img/admin.jpg';

const SET_MAINNAV_DOM = Symbol('setMainNavDom'),
    LOGOUT = Symbol('logout');

export default class MainNavApp{
    constructor(){}

    async setMainNav(){
        let userInfo = JSON.parse(localStorage.getItem('account')).email;

        this[SET_MAINNAV_DOM].apply(this, [userInfo]);
        this.bindEvents.apply(this);
    }

    [SET_MAINNAV_DOM](userInfo){
        let context = {
                logo: logo,
                portrait: portrait,
                username: userInfo
            },
            mainNavHtml = juicer(mainNavTpl, context);
        
        $('#main_nav').empty().append(mainNavHtml);
    }

    async [LOGOUT](){
        let result = await UtilRequire.ajaxRequire(USER.LOGOUT, 'POST');

        if(result.res.success){
            location.href = '/user/login';
        }
    }

    bindEvents(){
        $("body #logout").on('click', this[LOGOUT].bind(this));
    }
}
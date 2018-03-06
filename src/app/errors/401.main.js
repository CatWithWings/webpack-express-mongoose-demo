// style
import '../layout.scss';
import '../public.scss';
import './errors.scss';

import { resetJuicerConf } from '../share/config/juicer';
import UtilUrl from '../share/util/util.url';

// partial
import FooterApp from '../share/partial/footer/footer';

const FOOTER = new FooterApp();

class AuthenticationApp {
    constructor() {}

    init() {
        resetJuicerConf();
        FOOTER.setMainFooter();
        this.getSignal.apply(this);
        this.bindEvents.apply(this);
    }

    getSignal(){
        let query = UtilUrl.getQuery(),
            msgType = query.msg,
            errors = {
                NOT_EXIT: 'notExit', 
                TOKEN_TIMEOUT: 'tokenTimeout',
                LOCKED: 'locked',
                LOGINED : 'logined'
            },
            msg = '';
        
        switch(msgType){
            case errors.NOT_EXIT:
                msg = '账号不存在，请重新登录！';
                break;

            case errors.TOKEN_TIMEOUT:
                msg = '身份过期，请重新登录！';
                break;

            case errors.LOCKED:
                msg = '账号已被冻结，请联系客服！';
                break;

            case errors.LOGINED:
                msg = '账号已在异地登录，请更换账号重试！';
                break;

            default:
                msg = '账号异常，请重新登录！';
                break;
        }

        $("#signal").html(msg);
    }

    bindEvents() {
    }
}

const AUTHENTICATION = new AuthenticationApp();
AUTHENTICATION.init();
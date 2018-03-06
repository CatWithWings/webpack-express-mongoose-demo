// style
import './public.scss';
import './layout.scss';

// lib
import 'jquery.cookie';

import { resetJuicerConf } from './share/config/juicer';
import UtilToastr from './share/util/util.toastr';
import UtilUrl from './share/util/util.url';

// partial
import MainNavApp from './share/partial/main_nav/main_nav';
import SubNavApp from './share/partial/sub_nav/sub_nav';
import FooterApp from './share/partial/footer/footer';

const MAINNAV = new MainNavApp(),
    FOOTER = new FooterApp(),
    SUBNAV = new SubNavApp();

class BaseApp{
    constructor(){}

    init(){
        resetJuicerConf();
        this.setReqHeader.apply(this);
        MAINNAV.setMainNav();
        SUBNAV.setSubNav();
        FOOTER.setMainFooter();
        this.bindEvents();
    }

    setReqHeader(){
        $.ajaxSetup({
            "timeout": 30000,
            complete: function(xhr,status){
                var res = xhr.responseJSON,
                    handleError = (msg)=>{
                        UtilToastr.error({msg: msg});
                        setTimeout(() => {
                            location.href = '/user/login';
                        }, 2000);
                    };

                if(res.status === 401 && res.msg === 'tokenTimeout'){
                    handleError('身份过期，请重新登录！');
                }else if(res.status === 401 && res.msg === 'locked'){
                    handleError('账户已被冻结，请联系客服！');
                }else if(res.status === 401 && res.msg === 'logined'){
                    handleError('账户已在异地登录！');
                }
            }
        });
    }

    bindEvents(){}
}

const BASE = new BaseApp();
BASE.init();
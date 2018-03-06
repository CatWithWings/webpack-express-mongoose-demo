import juicer from 'juicer';
import moment from 'moment';
import UtilArray from '../../util/util.array';
import subNavTpl from './sub_nav.component';

const SYSTEM_SYMBOL = '/monitor',
    ROUTER_MAP = {
        home: {
            key: 'home',
            path: SYSTEM_SYMBOL + '/home'
        },
    };

const SET_ROUTER_REGX = Symbol('setRouterRegx');

export default class SubNavApp{
    constructor(){}
    
    setSubNav(){
        let context = {
                home: ROUTER_MAP.home,
            },
            subNavHtml = juicer(subNavTpl, context);
            
        $('#sub_nav').empty().append(subNavHtml);
        this[SET_ROUTER_REGX].apply(this);
    }

    [SET_ROUTER_REGX](){
        let pathname = window.location.pathname,
            pathArray = UtilArray.trim(pathname.split('\/')),
            systemSymbol = pathArray[0],
            path = pathArray[1];

        $(`#sub_nav [data-key="${path}"]`)
            .addClass('active');
    }
}
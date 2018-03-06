import Util from './util';

export default class UtilUrl extends Util{
    constructor(...args) {
        super(...args);
    }

    static getQuery(url){
        let currentUrl = url || document.location.href,
            strQueryString = "",
            aQueryString = [],
            queryResult = {},
            item = [],
            i = 0,
            len = 0;

        if (currentUrl.indexOf("?") > -1) {
            strQueryString = currentUrl.substr(currentUrl.indexOf("?") + 1);
            aQueryString = strQueryString.split("&");

            for(i, len=aQueryString.length; i<len; i++){
                item = aQueryString[i].split("=");
                queryResult[item[0]] = item[1];
            }
        }

        return queryResult
    }
}
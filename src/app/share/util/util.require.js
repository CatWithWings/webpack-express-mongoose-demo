import Util from './util';

export default class UtilRequire extends Util{
    constructor(...args) {
        super(...args);
    }

    static async ajaxRequire(url, type, options){
        return new Promise(function (resolve, reject) {
            let settings = {
                    url: url,
                    type: type, 
                    dataType: "json",
                    success: function (res, status, xhr) {
                        let result = {
                            res : res,
                            status: status,
                            xhr: xhr
                        };
                        resolve(result);
                    },
                    error: function (xhr, status, error) {
                        let result = {
                            xhr: xhr, 
                            status: status, 
                            error: error
                        };
                        reject(result);
                    }
                },
                ajaxSetting = {};
    
            Object.assign(ajaxSetting, settings, options);
    
            $.ajax(ajaxSetting);
        });
    }
}
import 'toastr/toastr.scss';
import toastr from 'toastr';
import Util from './util';

const OPTION = {
    "timeOut": "10000",
    "positionClass": "toast-bottom-center",
    "showMethod": "slideDown",
};

export default class UtilToastr extends Util{
    constructor(...args) {
        super(...args);
    }

    static success({msg, ops}){
        toastr.options = Object.assign({}, OPTION, ops);
        toastr.success(msg);
    }

    static info({msg, ops}){
        toastr.options = Object.assign({}, OPTION, ops);
        toastr.info(msg);
    }

    static error({msg, ops}){
        toastr.options = Object.assign({}, OPTION, ops);
        toastr.error(msg);
    }

    static warning({msg, ops}){
        toastr.options = Object.assign({}, OPTION, ops);
        toastr.warning(msg);
    }

    static clean = function(){
        toastr.clear()
    }
}
// style
import '../layout.scss';
import '../public.scss';
import './user.scss';

import { JSEncrypt } from '../../static/js/jsencrypt/jsencrypt';
import '../../static/js/jquery.idcode';
import '../../static/js/jquery.validate/jquery.validate.min';
import UtilToastr from '../share/util/util.toastr';
import { resetJuicerConf } from '../share/config/juicer';
import { CONFIG } from './share/config/validate';
import UtilRequire from '../share/util/util.require';
import { USER } from '../share/server/user';

// partial
import FooterApp from '../share/partial/footer/footer';

const FOOTER = new FooterApp();

class LoginApp {
    constructor() {}

    init() {
        resetJuicerConf();
        FOOTER.setMainFooter();
        $.idcode.setCode({
            inputID: 'idcode',
            e: 'idcodeCanvas',
            codeTip: ""
        });
        this.bindEvents.apply(this);
    }

    validateForm() {
        let validator = $("#loginForm").validate(Object.assign(
                {},
                CONFIG, 
                {
                    rules: {
                        email: {
                            required: true,
                            email: true,
                        },
                        password: {
                            required: true,
                            minlength: 6,
                            maxlength: 8
                        }
                    },
                    messages: {
                        email: {
                            required: "邮箱不能为空",
                            email: "邮箱格式不正确"
                        },
                        password: {
                            required: "密码不能为空",
                            minlength: "密码至少6位字符",
                            maxlength: "密码最多8位字符"
                        }
                    }
                }
            ));
        return validator;
    }

    validateIdcode() {
        jQuery.validator.addMethod("idcode", function (value, element, param) {
            return $.idcode.validateCode();
        }, '验证码不正确');

        let validator = $("#loginIdcodeForm").validate(Object.assign(
                {},
                CONFIG,
                {
                    onkeyup: false,
                    onkeydown: false,
                    rules: {
                        idcode: {
                            idcode: true
                        }
                    }
                }
            ));
        return validator;
    }

    enterIdcodeClick(e){
        if(e.keyCode == 13){
            this.executeValidateForm.apply(this);
        }
    }

    async executeValidateForm() {
        let infoVaildResult = this.validateForm().form(),
            idcodeVaildResult = this.validateIdcode().form(),
            result = await UtilRequire.ajaxRequire(USER.GET_KEY, 'GET'),
            publicKey= result.res.key,
            formData= {
                email: $('#email').val(),
                password: ()=>{
                    let encrypt  = new JSEncrypt();  
                    encrypt.setPublicKey(publicKey);
                    return encrypt.encrypt($('#password').val())
                }
            };
        if(infoVaildResult && idcodeVaildResult){
            this.executeSubmit.apply(this, [formData])
        }
    }

    async executeSubmit(data){
        let result = await UtilRequire.ajaxRequire(USER.LOGIN, 'POST', {data:data}),
            res = result.res;

        if(res.success === true){
            localStorage.setItem("account", res.account);
            location.href = `/monitor/home`;
        }else{
            let msg = (res.msg == 'notExit') ? 
                    '用户名或密码不正确!' : 
                    '账户被冻结，请联系客服!';

            UtilToastr.error({msg})
        }
    }

    bindEvents() {
        $('#login').on('click', this.executeValidateForm.bind(this));

        $("#idcode").on('keydown', this.enterIdcodeClick.bind(this))
    }
}

const LOGIN = new LoginApp();
LOGIN.init();
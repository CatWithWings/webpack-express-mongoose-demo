// style
import '../layout.scss';
import '../public.scss';
import './user.scss';

import { JSEncrypt } from '../../static/js/jsencrypt/jsencrypt';
import '../../static/js/jquery.validate/jquery.validate.min';
import { resetJuicerConf } from '../share/config/juicer';
import { CONFIG } from './share/config/validate';
import UtilRequire from '../share/util/util.require';
import { USER } from '../share/server/user';

// partial
import FooterApp from '../share/partial/footer/footer';

const FOOTER = new FooterApp();
const PASSWORD_STASTUS_INVISIBLE = Symbol('invisible');
const PASSWORD_STASTUS_VISIBLE = Symbol('visible');

class RegisterApp {
    constructor() {}

    init() {
        resetJuicerConf();
        FOOTER.setMainFooter();
        this.bindEvents.apply(this);
        console.log(localStorage.getItem('cat'))
    }

    changePasswordStatus(fieldId, currentStatus){
        let $statusContainer = $(fieldId).parents('[name="formItem"]')
                .find('[name="statusContainer"]');

        switch(currentStatus){
            case PASSWORD_STASTUS_INVISIBLE:
                $(fieldId).attr('type', 'text');
                $statusContainer.find('[name="invisible"]')
                    .addClass('hidden');
                $statusContainer.find('[name="visible"]')
                    .removeClass('hidden');
                break;

            case PASSWORD_STASTUS_VISIBLE:
            default:
                $(fieldId).attr('type', 'password');
                $statusContainer.find('[name="visible"]')
                    .addClass('hidden');
                $statusContainer.find('[name="invisible"]')
                    .removeClass('hidden');
                break;
        }
    }

    validateForm() {
        jQuery.validator
            .addMethod("passwordNorm", function (value, element, param) {
            let val = value,
                regxHasEnglish = new RegExp(/[0-9]/g),
                regxHasNum = new RegExp(/[a-zA-Z]/g),
                regxAllow = new RegExp(/^[a-zA-Z0-9_]+$/g);

            return (regxHasEnglish.test(val) && regxHasNum.test(val))  && regxAllow.test(val);
        }, '密码可以为英文、数字和下划线，且必须同时包含英文和数字');

        let validator = $("#loginForm").validate(Object.assign(
                {},
                CONFIG, 
                {
                    rules: {
                        email: {
                            required: true,
                            email: true,
                            remote: {
                                url: USER.VAILD_EMAIL,
                                type: "get",
                                dataType: "json",
                                cache:false,
                                async:false,
                                dataFilter: function(data, type) {
                                    if(data === true || data==='true'){
                                        return true
                                    }else{
                                        return false;
                                    }
                                }
                            }
                        },
                        password: {
                            required: true,
                            minlength: 6,
                            maxlength: 8,
                            passwordNorm: true
                        },
                        rePassword:{
                            equalTo: '#password'
                        }
                    },
                    messages: {
                        email: {
                            required: "邮箱不能为空",
                            email: "邮箱格式不正确",
                            remote: '邮箱已存在'
                        },
                        password: {
                            required: "密码不能为空",
                            minlength: "密码至少6位字符",
                            maxlength: "密码最多8位字符"
                        },
                        rePassword:{
                            equalTo: '两次输入的密码不相同'
                        }
                    }
                }
            ));
        return validator;
    }

    async executeValidateForm() {
        let infoVaildResult = this.validateForm().form(),
            result = await UtilRequire.ajaxRequire(USER.GET_KEY, 'GET'),
            publicKey= result.res.key,
            formData = {
                email: $('#email').val(),
                password: ()=>{
                    let encrypt  = new JSEncrypt();  
                    encrypt.setPublicKey(publicKey);
                    return encrypt.encrypt($('#password').val())
                }
            };

        if(infoVaildResult){
            let $register = $('#register');
            $register.attr('disabled', 'disabled');
            this.executeSubmit.apply(this, [formData]);
        }
    }

    async executeSubmit(data){
        let result = await UtilRequire.ajaxRequire(USER.REGISTER, 'POST', {data:data}),
            res = result.res;

        if(res.success === true){
            location.href = '/user/login';
        }
    }

    bindEvents() {
        $('#register').on('click', this.executeValidateForm.bind(this));

        $('#passwordStatus [name="invisible"]')
            .on('click', 
                this.changePasswordStatus.bind(this, '#password', PASSWORD_STASTUS_INVISIBLE));

        $('#passwordStatus [name="visible"]')
            .on('click', 
                this.changePasswordStatus.bind(this, '#password', PASSWORD_STASTUS_VISIBLE));

        $('#rePasswordStatus [name="invisible"]')
            .on('click', 
                this.changePasswordStatus.bind(this, '#rePassword', PASSWORD_STASTUS_INVISIBLE));

        $('#rePasswordStatus [name="visible"]')
            .on('click', 
                this.changePasswordStatus.bind(this, '#rePassword', PASSWORD_STASTUS_VISIBLE));
    }
}

const REGISTER = new RegisterApp();
REGISTER.init();
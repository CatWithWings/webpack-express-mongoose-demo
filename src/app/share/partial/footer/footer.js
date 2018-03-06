import juicer from 'juicer';
import moment from 'moment';
import footerTpl from './footer.component';

export default class FooterApp{
    constructor(){}
    
        setMainFooter(){
            let context = {
                    endDate : moment().format('YYYY')
                },
                footerHtml = juicer(footerTpl, context);
            
            $('#main_footer').empty().append(footerHtml);
        }
}
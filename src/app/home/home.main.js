import UtilRequire from '../share/util/util.require';

class HomeApp{
    constructor(){}

    init(){
        // this.test.apply(this);
        this.bindEvents.apply(this);
    }

    async test(){
        let res = await UtilRequire.ajaxRequire('/api/home', 'POST');
    }

    bindEvents(){
        $("#test").on('click', this.test.bind(this));
    }
}

const HOME = new HomeApp();
HOME.init();
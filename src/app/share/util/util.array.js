import Util from './util';

export default class UtilArray extends Util{
    constructor(...args) {
        super(...args);
    }

    /* !
     * 删除数组中所有指定元素(仅限简单一维数组)或压缩稀疏矩阵
     */
    static short(arr, val=undefined){
        let vaule = val,
            items = [];

        for(let i=0, len=arr.length; i<len; i++){
            if(arr[i] !== vaule){
                items.push(arr[i])
            }
        }

        return items;
    }

    /*
     * 去除数组中的空字符串
     */
    static trim(arr){
        let items = [];

        for(let i=0, len=arr.length; i<len; i++){
            if(arr[i] !== ""){
                items.push(arr[i])
            }
        }

        return items;
    }
}
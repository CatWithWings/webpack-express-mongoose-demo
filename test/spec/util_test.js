import UtilUrl from'../../src/app/share/util/util.url';

describe("util url spec", function (){
    it("获取url查询参数，返回object", function () {
        let url = 'http://www.test.com?name=Amy&age=18'
        expect(UtilUrl.getQuery(url)).toEqual({name: 'Amy', age: '18'});
    });
})
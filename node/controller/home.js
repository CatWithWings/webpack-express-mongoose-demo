module.exports = function(app){
    app.post('/api/home',function(req, res){
        console.log('/api/home :', req.query)
        res.send({result: 'success'});
    })
}
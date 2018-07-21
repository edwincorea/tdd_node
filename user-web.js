var Koa = require('koa');
var Router = require('koa-router');

var data = require('./user-data');

var app = module.exports = new Koa();
var router = new Router();

// koa v1: generator functions
// router.get('/user', function*(){
//     this.body = yield data.users.get();
// });

// koa v2: async/await functions
router.get('/user', async function(ctx){
    ctx.body = await data.users.get();
});

app.use(router.routes());

app.listen(3000);


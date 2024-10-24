const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const searchEngineTool = require("./searchEngineTool");

const app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}

    let searchKey = ctx.request.body.searchKey||ctx.request.body.q;
    let engine = ctx.request.body.engine || ctx.query.engine || 'baidu';

    const results = await searchEngineTool(searchKey, engine);
    console.log('搜索结果:');
    results.forEach(result => {
        console.log('标题:', result.title);
        console.log('链接:', result.href);
        console.log('摘要:', result.abstract);
        console.log('----------------------');
    });
    const output_result = results.map(result => result.title + result.abstract).join('\n');
    ctx.body = { prompt: `Search key: ${searchKey}; Search results: ${output_result}` };
});

app.listen(3000);

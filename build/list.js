const PORT=5000;
const express=require('express');
const axios=require('axios');
const cheerio=require('cheerio');
const { listen } = require('express/lib/application');
const app=express();
const list=[];

app.get('/',(req,res)=>
{
    res.json("Hemlo gyuzzzz");
})
app.get('/news',(req,res)=>
{
    axios.get('https://en.wikipedia.org/wiki/List_of_Indian_Premier_League_players')
    .then((response)=>{
        const html=response.data
        const $=cheerio.load(html)

        $('a').each(function()
        {
            const player=$(this).text();
            list.push(player);
        })
        res.json(list);
    }).catch((err)=>console.log(err));
    
})

app.listen(PORT,()=>console.log(`runnin on PORT ${PORT}`));
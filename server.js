const express=require("express");
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear',()=>{
    
    return new Date().getFullYear();
})

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));



app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`
    
    console.log(log);
    fs.appendFile('server-log', log + '\n' , (err)=>{
        
        if(err){
        console.log("Unable to server log message")
        }
    })
    next();
    
})


/*app.use((req,res,next) => {
    
    res.render('maitainance.hbs')
})*/

app.get('/',(req,res)=>{
    
    res.send('<h1>hello world!</h1>')
    
});

app.get('/about',(req,res)=>{
    
    res.render('about.hbs',{
        pageTitle:'About Page',
        
    })
});

app.listen(port,()=>{
    
    console.log(`Server is running on port ${port}`);
});
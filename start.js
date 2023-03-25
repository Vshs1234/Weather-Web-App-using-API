const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
    
});
app.post('/',function(req,res){
    const query=req.body.city;
    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f2e06b6529ab01f36af2bfc3a64f1682&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl=" https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(desc);
            res.write("<body><p>The weather is currently "+desc+"<p>");
            res.write("<h1>The temperature in "+query+" is "+temp+"degrees Celsius <br>");
            res.write("<img src="+imageUrl+"></body>")
            res.send();
        });
    });

});



app.listen(3000,function(){
    console.log("Server is listnening at port 3000.");

});
const request = require("request");
request("https://jsonplaceholder.typicode.com/todos/1",(error,response,body)=>{
    if(!error&&response.statusCode === 200){
            const parsedData = JSON.parse(body);
            console.log(parsedData["title"]);
        }
});
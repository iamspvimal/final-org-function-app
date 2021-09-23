//const fs = require('fs');
const {MongoClient} = require("mongodb");
const client =
new MongoClient("mongodb://mongodbfinal0921:ySoyDIm29tC3ksbqSHzKTuLTBGMeXvbDzlJDEyV7uthQUCgyEBrROwzDs6AqxG8jLzyiosOg47ViR7TUPeVdMg==@mongodbfinal0921.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodbfinal0921@");
//const totalComplaints = require("./complaints");

module.exports = async function (context, myQueueItem) {
    
    //context.log('JavaScript queue trigger function processed work item', myQueueItem);
    //const jsData = JSON.parse(myQueueItem);
    //context.log(jsData.message);
    //context.log(myQueueItem);

    await client.connect();
    const database = client.db("organic");
    const collection = database.collection("messages");
    const totalComplaints = database.collection("totalcomplaints");
   

    const parsedObj = JSON.stringify(myQueueItem); // an *json* that contains the complaints data
    //const msg = parsed;         // split
    //context.log(parsedObj); 

    const jsData = JSON.parse(parsedObj);

    const msgList = await collection.find({ username : jsData.username }).toArray();
    //context.log(jsData);  
    context.log(jsData.username); 
    context.log(jsData.email); 
    context.log("Total Complaints:" + msgList.length); 

    if(jsData.username)
        {
            // Construct response
            const responseJSON = {id: Math.random()*1000, 
                "username": jsData.username,
                "complaintsCount": msgList.length                
            }
            context.log(responseJSON); 
            await totalComplaints.insertOne(responseJSON);           
        }

    context.bindings.outputQueueItem =  myQueueItem;
    context.log("myQueueItem - has been processed!"); 

};
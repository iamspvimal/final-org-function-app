
const {MongoClient} = require("mongodb");
const client =
new MongoClient("mongodb://mongodbfinal0921:ySoyDIm29tC3ksbqSHzKTuLTBGMeXvbDzlJDEyV7uthQUCgyEBrROwzDs6AqxG8jLzyiosOg47ViR7TUPeVdMg==@mongodbfinal0921.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodbfinal0921@");

module.exports = async function (context, req) {
      
    context.log('JavaScript HTTP trigger function processed a request.');

    await client.connect();
    const database = client.db("organic")
    const collection = database.collection("products")

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = req.method ? req.method : "No Content";
   
    //const method = req;
    if (req.method == 'GET')
    {
        context.log('HTTP trigger GET');
        //responseMessage = "GET";
        const list = await collection.find({}).toArray();
        return context.res = {
        status: 200,
        body: list
        };

    }
    else if(req.method == 'POST')
    {         
        context.log('HTTP trigger POST'); 
        context.log(req.body); 
        // context.log(req.file.originalname);
        // context.log(req.file.buffer);
             
        //responseMessage = "POST";    
        if(req.query.name || (req.body && req.body.name))
        {
            // Construct response
            const responseJSON = {id: Math.random()*1000 , "name": name,
                "description": req.body.description,
                "price": req.body.price,
                "qty": req.body.qty,
                "type": req.body.type,
                "image":  req.body.imagename
            }
            await collection.insertOne(responseJSON);           
        }

        return context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage,
            status: 200
        };
    }

    // return context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: "GET-POST-->>" + req.method,
    //     status: 200
    // }
        
    
}
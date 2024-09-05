var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var multer = require("multer");


var cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
    cloud_name: 'dcngnm3hf',
    api_key: '294566135715775',
    api_secret: 'Aay78KdGq88V69ZK6Y9-jirHb98' // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./temp");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})



const upload = multer({ storage: storage })

var conString = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//these code is coming from multer library in npm
app.post("/send", upload.single("photoUrl"),async (req, res) => {
    try {
        console.log(req.body);
        let image = req.file;
        console.log(image);

        const uploadResult = await cloudinary.uploader.upload(image.path);
        
        var recipe = {
            "id": parseInt(req.body.id),
            "title": req.body.title,
            "course": req.body.course,
            "ingredients": req.body.ingredients,
            "directions": req.body.directions,
            "photoUrl": uploadResult.secure_url,
        };
    
        const client = await mongoClient.connect(conString);
        const database = client.db("recipe-app");
        await database.collection("recipe-details").insertOne(recipe);
        console.log("Added",recipe);
        res.status(200).send("Recipe added successfully");
    } catch (error) {
        console.error("Error uploading to Cloudinary or inserting to MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
});





app.get("/get", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("recipe-details").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });


});
app.get("/get/:title", (req, res) => {
    var title = req.params.title;
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        //new keyword allows to create a regular expression object dynamically. This is useful when you need to create a regular expression pattern based ona variabe or user input.
        database.collection("recipe-details").find({ title: new RegExp(title) }).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})

app.get("/get-course/:course", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("recipe-details").find({ course:req.params.course }).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})

app.get("/get-id/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        console.log(req);
        database.collection("recipe-details").find({ id:parseInt(req.params.id)}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})

//User Collection

app.get("/get-users",(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("recipe-app");
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})
app.post("/register-user",(req,res)=>{
    var user={
        UserName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile:req.body.Mobile
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("recipe-app");
        database.collection("users").insertOne(user).then(()=>{
            console.log("User Added");
            res.end();
        })
    })
})
app.get("/get-admin",(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("recipe-app");
        database.collection("admin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})
app.post("/register-admin",(req,res)=>{
    var user={
        AdminName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile:req.body.Mobile
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("recipe-app");
        database.collection("admin").insertOne(user).then(()=>{
            console.log("Admin Added");
            res.end();
        })
    })
})
app.delete("/delete-recipe/:id",(req,res)=>{
    var id=parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject=>{
        var database=clientObject.db("recipe-app");
        database.collection("recipe-details").deleteOne({id:id}).then(()=>{
            console.log("Recipe Deleted");
            res.end();
        })
    })
})
app.listen(2233);
console.log(`Server started:http://127.0.0.1:2233`);
require('dotenv').config();  // Load environment variables from .env file
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var multer = require("multer");
var cloudinary = require("cloudinary").v2;

// Cloudinary Configuration using Environment Variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../temp");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

var conString = process.env.MONGODB_URI;  // Use MongoDB connection string from .env
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Recipe-App");
})

// Route to handle file uploads and saving to MongoDB
app.post("/send", upload.single("photoUrl"), async (req, res) => {
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
        console.log("Added", recipe);
        res.status(200).send("Recipe added successfully");
    } catch (error) {
        console.error("Error uploading to Cloudinary or inserting to MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Other routes for fetching data
app.get("/get", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("recipe-details").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

// Fetch by title
app.get("/get/:title", (req, res) => {
    var title = req.params.title;
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("recipe-details").find({ title: new RegExp(title) }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

// Fetch by course
app.get("/get-course/:course", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("recipe-details").find({ course: req.params.course }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

// Fetch by ID
app.get("/get-id/:id", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        console.log(req);
        database.collection("recipe-details").find({ id: parseInt(req.params.id) }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

// User collection operations
app.get("/get-users", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.post("/register-user", (req, res) => {
    var user = {
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("users").insertOne(user).then(() => {
            console.log("User Added");
            res.end();
        });
    });
});

// Admin collection operations
app.get("/get-admin", (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("admin").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.post("/register-admin", (req, res) => {
    var user = {
        AdminName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("admin").insertOne(user).then(() => {
            console.log("Admin Added");
            res.end();
        });
    });
});

// Delete a recipe by ID
app.delete("/delete-recipe/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("recipe-app");
        database.collection("recipe-details").deleteOne({ id: id }).then(() => {
            console.log("Recipe Deleted");
            res.end();
        });
    });
});

// Start the server using the port from .env
app.listen(process.env.PORT, () => {
    console.log(`Server started: http://127.0.0.1:${process.env.PORT}`);
});

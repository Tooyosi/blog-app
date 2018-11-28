var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose");
    
//APP CONFIG
mongoose.connect("mongodb://localhost/RESTfullBlogApp"); //connect to database
app.set("view engine", "ejs");
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blogpost", blogSchema);

//RESTfull ROUTES
//INDEX ROUTE
app.get("/", (req, res)=>{
    res.redirect("/blogs");
});

app.get("/blogs", (req, res)=>{
    Blog.find({}, (err, blogpost)=>{
        if(err){
            console.log("Error Occured");
        }else {
            res.render("index", {blogs: blogpost});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new", (req, res)=>{
    res.render("new");
});
//CREATE ROUTE
app.post("/blogs", (req, res)=>{
    Blog.create(req.body.blog, (err, newBlog)=>{
        if(err){
            res.render("new");
        }else {
            res.redirect("/blogs")
        }
    })
});

//SHOW ROUTE
app.get("/blogs/:id", (req, res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE

app.get("/blogs/:id/edit", (req, res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            res.render("/blogs");
        }else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE

app.put("/blogs/:id", (req, res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id );
        }
    });
});

//DELETE ROUTE

app.delete("/blogs/:id", (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/blogs");
        }else {
            res.redirect("/blogs");
        }
    });
});
                       
//SIGN UP ROUTE

app.get("/signUp", (req, res)=>{
    res.render("signUp");
});

//Login Route

app.get("/login", (req, res)=>{
    res.render("login");
});

app.listen(8080, "127.0.0.1", (req, res)=>{
    console.log("Server is Up and Running!!!");
});
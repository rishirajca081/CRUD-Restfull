const express=require("express");
const { v4: uuidv4 } = require('uuid');
const app=express();
let port=8080;
const path=require("path");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.listen(port,(req,res)=>{
    console.log("server is listening");
});
let posts=[
    {
        id:uuidv4(),
    username:"Rishiraj172",
    content:"Hello guyzz, mai hu ek developer"
},
{
    id:uuidv4(),
    username:"samir007",
    content:"mai hu ek khiladi"
},
{
    id:uuidv4(),
    username:"apple123",
    content:"New iphone launched"
}];
app.get("/post",(req,res)=>{
    //res.send("Server is working well");
    
    res.render("index.ejs",{posts});
});
app.get("/post/new",(req,res)=>{
    res.render("form.ejs");
})
app.post("/post",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
   // res.send("post api is working")
})
app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    console.log(post);
    //res.send("working fine"+id);
    res.render("details.ejs",{post});
})
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
    //res.send("working the patch..");
})
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    const newcontent=req.body.content;
    const post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    //res.send("patch request working...");
    res.redirect("/post");
})
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
   posts= posts.filter((p)=>id!==p.id);
   res.redirect("/post");
})

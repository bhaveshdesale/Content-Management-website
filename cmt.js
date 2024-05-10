const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');

const app=express();
const port=8181;

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/Chaitali',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

//create a schema for data
const ItemSchema =new mongoose.Schema({
    title:String,
    content:String,
    video:String,
    image:String
});

//create model
const Item=mongoose.model('Item',ItemSchema);

//route to handle get request
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/cmt.html');
});

//route to handle post request
app.post('/items',(req,res)=>{
    const newItem=new Item({
        title:req.body.title,
        content:req.body.content,
        video:req.body.video,
        image:req.body.image,
    });

    newItem.save()
    .then(item=>res.send(`${item.title}saved to database`))
    .catch(err=>res.status(400).send("unabvle to save data"));
});
//start server

app.listen(port,()=>{
    console.log(`Server runnng on http://localhost:${port}`);
});

function addBlog() {
    // Retrieve input values
    var title = document.getElementById("title").value;
    var image = document.getElementById("image").value;
    var content = document.getElementById("content").value;

    // Create HTML structure for the blog post
    var blogPost = document.createElement("div");
    blogPost.className = "blog-post";
    blogPost.innerHTML = `
      <h3>${title}</h3>
      <img src="${image}" alt="Blog Image">
      <p>${content}</p>
    `;

    // Add the blog post to the preview section
    var previewSection = document.getElementById("preview");
    previewSection.appendChild(blogPost);

    // Clear input fields after adding the blog
    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("content").value = "";
  }
  



  
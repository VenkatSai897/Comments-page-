const exp = require('express');
const { get } = require('http');
const { type } = require('os');
const app = exp();
const path = require('path');
const {v4:getId} = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

console.log(typeof(getId()))
app.use(exp.urlencoded({extended:true}));

app.get('/chips',(req,res)=>{
    res.send("This is a get request");
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
let comments = [
    {   
        id:getId(),
        username : "John",
        comment: "What a day"
    },
    {   
        id : getId(),
        username : "Todd",
        comment : "blah blah"
    },
    {   
        id : getId(),
        username : "bowbow",
        comment : "bow bow"
    }
]




app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});

})


app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})

app.post('/comments',(req,res)=>{
    console.log(req.body)
    
    const {username,comment} = req.body;
    comments.push({username,comment,id:getId()});
    
    res.redirect('/comments')

})
app.post('/comments/find',(req,res)=>{
    const {ID}  = req.body;
    console.log(req.body);

    //res.send("IT worked");
    //console.log(`/comments/${ID}`);

    res.redirect(`/comments/${ID}`);

})
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id == id);
    res.render('comments/show',{comment});


})

app.get('/comments/:id/edit',(req,res)=>{
    const { id } = req.params;
    const comment1 = comments.find(c => c.id == id);
    res.render('comments/edit',{comment1})
})
app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    
    res.redirect('/comments');

    
})
app.patch('/comments/:id',(req,res)=>{
    const { id } = req.params;
    const commentFound = comments.find(c =>c.id===id);
    const commentText = req.body.comment ;
    commentFound.comment = commentText;
    res.redirect('/comments');


})
app.post('/chips',(req,res)=>{
    
    
    const {qty , type } = req.body
    res.send(`Here are your ${qty} ${type}`);
    
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000");

})
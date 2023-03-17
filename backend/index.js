const express = require("express");
const connectToMongo = require("./db/config");
const User = require("./db/User");
const Product=require("./db/Product")
const cors = require("cors");
const app = express();
const Jwt=require('jsonwebtoken');
const jwtKey='e-shopping'
const port = 5000;
connectToMongo();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject(); //at the time of save we can't use select to delete any field from response.
  delete result.password;
  if(result)
  {
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
      if(err)
      {
        res.send({ result: "An Unexpected Error" });
      }
      res.send({ result, auth : token})
    })
  }
  else{
    res.send({ result: "Unable to signup" });
  }
})

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},jwtKey,{expiresIn: "2h"},(err,token)=>{
      if(err)
      {
        res.send({ result: "An Unexpected Error" });
      }
        res.send({user, auth : token})
      })
      
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "Fill all the details" });
  }
});

app.post('/add',verifyToken,async(req,res)=>{
  let product=new Product(req.body)
  let result=await product.save()
  res.send(result)
})

app.get('/products',verifyToken,async(req,res)=>{
const products=await Product.find()
if(products.length>0)
{
  res.send(products)
}
else{
  res.send({result:"No Product Found"})
}
})

app.delete('/product/:id',async(req,res)=>{
  const result=await Product.deleteOne({_id:req.params.id})
  if(result)
  {
    res.send(result)
  }else{
    res.send({result:"No Product Found"}) 
  }
})


app.get('/product/:id',async(req,res)=>{
  let result=await Product.findOne({_id:req.params.id})
  if(result)
  {
    res.send(result)
  }
  else{
    res.send({result:"No Product Found"}) 
  }
})

app.put('/product/:id',async(req,res)=>{
let result=await Product.updateOne({_id:req.params.id},
{$set:req.body})
res.send(result)
})

app.get('/search/:key',verifyToken,async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex: req.params.key}},
      {company:{$regex: req.params.key}},
    ]})
    res.send(result)
})

function verifyToken(req,res,next){
let token= req.headers['authorization']
if(token){
token=token.split(' ')[1]  
Jwt.verify(token,jwtKey,(err,valid)=>{
if(err){
  res.status(401).send({result:'Please provide valid token'})
}else{
  next()
}
})
}else{
res.status(403).send({result:'Please add token with header'})
}
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//get method is used when we need a page to load and show some data //post,put,patch,delete these methods are used while form submission,etc.
//response(res) is sent by the server(backend) on the request(req) by client(frontend)

//is this possible to create multiple routes with same name !! 
//Ans is yes, if the method is different(here, get and delete has same route name)

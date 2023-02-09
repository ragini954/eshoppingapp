const express = require("express");
const connectToMongo = require("./db/config");
const User = require("./db/User");
const Product=require("./db/Product")
const cors = require("cors");
const app = express();
const port = 5000;
connectToMongo();

app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject(); //at the time of save we can't use select to delete any field from response.
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "Fill all the details" });
  }
});

app.post('/add',async(req,res)=>{
  let product=new Product(req.body)
  let result=await product.save()
  res.send(result)
})

app.get('/products',async(req,res)=>{
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
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//get method is used when we need a page to load and show some data //post,put,patch,delete these methods are used while form submission,etc.
//response(res) is sent by the server(backend) on the request(req) by client(frontend)

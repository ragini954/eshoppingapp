const express = require('express')
const connectToMongo=require('./db/config')
const User=require('./db/User')
const cors=require('cors')
const app = express()
const port = 5000
connectToMongo()

app.use(cors())
app.use(express.json())
app.post('/register', async (req,res)=>{
    let user=new User(req.body)
    let result=await user.save()
    res.send(result)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//get method is used when we need a page to load
//post,put,patch,delete these methods are used while form submission,etc.
//response(res) is sent by the server(backend) on the request(req) by client(frontend)
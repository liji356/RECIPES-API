const Express=require("express")
const Mongoose=require("mongoose")
const BodyParser=require("body-parser")


var app=Express()
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   );
    next(); });

var foodmodel=Mongoose.model("Foods",
new Mongoose.Schema(
    {
        title:String,
        category:String,
        description:String,
        prepare:String
    }
   
    
))

Mongoose.connect("mongodb+srv://ligy:Liji1999@cluster0.25xx9.mongodb.net/foodDB")


app.post("/api/recipes",(req,res)=>{
    var gettitle=req.body.title
    var getcategory=req.body.category
    var getdescription=req.body.description
    var getprepare=req.body.prepare

     var data={"title":gettitle,"category":getcategory,"description":getdescription,"prepare":getprepare}

     let food=new foodmodel(data)
     food.save((error,data)=>{
         if(error)
         {
             res.send({"status":error,"data":error})
         }
         else
         {
             res.send({"status":"success","data":data})
         }
     })
   
})
app.post("/api/search",(req,res)=>{
    var getTitle=req.body
    foodmodel.find(getTitle,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
})

app.get("/api/viewall",(req,res)=>{
    foodmodel.find((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
})

app.post("/api/deleteapi",(req,res)=>{
    var getId=req.body
    foodmodel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":error,"data":data})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
})


app.listen(4000,()=>{
    console.log("server running")
})
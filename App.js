const Express=require("Express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });
    
var busModel=Mongoose.model("buses",
new Mongoose.Schema({
    route:String,
    busname:String,
    busregno:String,
    owner:String,
    contactnum:String
})
)

Mongoose.connect("mongodb+srv://anjalireghunath:9846434831@cluster0.ursz9.mongodb.net/busDB")

app.get("/api/viewall",(req,res)=>{
    busModel.find(
        (error,data)=>{
            if(error){
res.send({"status":"error"})
            }
            else{
res.send(data)
            }
        }
    )
})

app.post("/api/addroute",(req,res)=>{
    var data=req.body
    let ob=new busModel(data)
    ob.save(
        (error,data)=>{
            if(error){
res.send({"status":"error"})
            }
            else{
res.send({"status":"success","data":data})
            }
        }
    )
})

app.listen(4004,()=>{
    console.log("server running")
})
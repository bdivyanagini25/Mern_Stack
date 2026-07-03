/*console.log("hello");

const express=require("express");

const app=express();
const PORT=3000;

app.use(express.json());

const names=[];

function hello(req,res){
    res.json({
        message:"Hello World"
    });
    res.send("Hello World");
}

//http://localhost:3000/add?a=10&b=20
function add(req,res){
    const a=Number(req.query.a);
    const b=Number(req.query.b);
    const sum=a+b;

    res.json({
        result: sum
    });
}

//http://localhost:3000/sphere?r=10
function sphere(req,res){
    const r=Number(req.query.r);
    const volume=(4/3)*Math.PI*Math.pow(r,3);

    res.json({
        result: volume
    });
}

// POST http://localhost:3000/names {"names": "Divya"} // add name to list
// GET  http://localhost:3000/names                    // get all names
function username(req,res){
    const { name } = req.body;

    if(!name){
        return res.json({
            error: "Please add the name",
        })
    }

    names.push(name);

    res.json({
        message: "Success",
        data: names,
    });
}

app.get("/",hello);
app.get("/hello",{req,res}=>{
    res.json({
        message:"Hello",

    })
})
app.get("/add",add);
app.get("/sphere",sphere);
app.post("/name",username);

app.listen(PORT);
*/

const express=require('express')

const app=express();
const PORT=5000;

app.use(express.json());

const names=[];

//CREATE
app.post("/names",(req,res)=>{
    const{name}=req.body;
    if(!name){
        return res.status(400).json({
            error: "Name is required",
        });
    }

    names.push(name);
    res.status(201).json({
        message:"Name Added"
    });
});

//READ ALL
app.get("/names",(req,res)=>{
    res.status(200).json({
        message:"SUccess",
        data:names,
    });
});

//READ ONE
app.get("/names/:index",(req,res)=>{
    const index=Number(req.params.index);
    if(index<0 || index>=names.length){
        return res.status(404).json({
            error:"Not found",
        });
    }
    res.status(200).json({
        name:names[index],
    });
});

//UPDATE
app.put("/names/:index",(req,res)=>{
    const index=Number(req.params.index);
    const {name}=req.body;

    if(index<0 || index>=names.length){
        return res.status(404).json({
            error:"Not found",
        });
    }

    names[index]=name;
    res.status(200).json({
        message:"Successfully Updated",
        data:names,
    });
});

//DELETE
app.delete("/names/:index",(req,res)=>{
    const index=req.params.index;

    if(index<0 || index>=names.length){
        return res.status(404).json({
            error:"Not found",
        });
    }

    names.splice(index,1);

    res.status(200).json({
        message:"Deleted Successfully",
        data:names,
    });

});

app.listen(PORT)
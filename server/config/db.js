const mongoose=require('mongoose')

// const connectToDatabase= mongoose.connect('mongodb+srv://farming:farming123@cluster0.mhy2d.mongodb.net/Farming?retryWrites=true&w=majority&appName=Cluster0')

const connectToDatabase= async()=>{
    try{
        const connection=await mongoose.connect('mongodb+srv://farming:farming123@cluster0.mhy2d.mongodb.net/Farming?retryWrites=true&w=majority&appName=Cluster0')
        // console.log(`connecting to database`)
        console.log(` connected to database ${connection.connection.db.databaseName}`)
    }
    catch(error){
        console.error(`Failed to connect to database:${error.message}`)
    }
    }
    
    module.exports= {connectToDatabase}
import app from "./app"
import { pool} from "./config/db";
const PORT = process.env.PORT||3000;
const server = async()=>{
    try{
    await pool.query("SELECT 1");
    console.log("database connected successfully")
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`)
    })
}catch(err:any){
    console.error(err.message)
}
}
server();
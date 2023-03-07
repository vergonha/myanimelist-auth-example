const app =     require("./config/express")();
const port =    app.get("port")
const cors =    require('cors')


app.use(cors())
app.listen(port, () => {
    console.log(`Server running, port: ${port}`)
    require('child_process').exec('open http://127.0.0.1:3000/')
})
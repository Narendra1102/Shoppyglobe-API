import { login, register } from "../controller/user.controller.js"


export function userRoute(app){
    //register
    app.post("/api/register",register)
    //login
    app.post("/api/login",login)
}
import { Application, Request, Response } from "express";

class defaultRouter {

    app: Application
    baseURI: String
    constructor(app: Application){
        this.app = app
        this.baseURI = '/'
    }

    routes(baseURI: String){

        this.app.get(`${this.baseURI}`, (req: Request, res: Response) => {
            res.send('Notes API root URI');
        });
    }
}
export { defaultRouter }
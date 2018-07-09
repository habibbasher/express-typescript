import { Request, Response } from 'express';

export default class Crud {

    public req: Request;
    public res: Request;

    constructor() {
    }

    // Get all data of the passed model from database
    public findAll(dbModel: any, callback): any {
        dbModel.find()
        .then((data) => {
            callback(data, {});
        })
        .catch((error) => {
           callback({}, error);
        });
    }
    // Get single data of the passed model from database
    public findOne(dbModel: any, params: any, callback): any {
        dbModel.findOne(params)
        .then((data) => {
            callback(data, {});
        })
        .catch((error) => {
           callback({}, error);
        });
    }
    // Create all data of the passed model from database
    public createOne(dbModel: any, callback): any {
        dbModel.save()
        .then((data) => {
            callback(data, {});
        })
        .catch((error) => {
            callback({}, error);
        });
    }
    // Update single data of the passed model from database
    public updateOne(dbModel: any, params: any, payload: any, callback): any {  
        dbModel.findOneAndUpdate(params, payload)
        .then((data) => {
            callback(data, {});
        })
        .catch((error) => {
           callback({}, error);
        });
    }
    // Delete single data of the passed model from database
    public deleteOne(dbModel: any, params: any, callback): any {  
        dbModel.findOneAndDelete(params)
        .then(() => {
            callback({});
        })
        .catch((error) => {
           callback(error);
        });
    }

}
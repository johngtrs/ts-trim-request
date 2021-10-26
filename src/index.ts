import express from "express";

// trim all string properties of an object
function trimStringProperties(obj: any): any {
    if (obj !== null && typeof obj === 'object') {
        for (var prop in obj) {
            // if the property is an object trim it
            if (typeof obj[prop] === 'object') {
                obj[prop] = trimStringProperties(obj[prop]);
            }

            // if it's a string remove begin and end whitespaces
            if (typeof obj[prop] === 'string') {
                obj[prop] = obj[prop].trim();
            }
        }
    }
    return obj;
}


// trimRequest middleware: trim all request object: body, params, query
var all = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        trimStringProperties(req.body);
    }

    if (req.params) {
        trimStringProperties(req.params);
    }

    if (req.query) {
        trimStringProperties(req.query);
    }

    next();
}

// Trim body object only
var body = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body) {
        trimStringProperties(req.body);
    }
    next();
}

// Trim params only
var param = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.params) {
        trimStringProperties(req.params);
    }
    next();
}

// Trim query params only
var query = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.query) {
        trimStringProperties(req.query);
    }
    next();
}

export = {
    all: all,
    body: body,
    param: param,
    query: query
};
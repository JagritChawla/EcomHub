
//when api os called at the undefined route
const notFound = (req, res , next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};


//when throwing any error explicittly
const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;

    //check for the mongoose bad ObjectId
    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        // console.log("error handler working")
        message = `Resource not found abcd`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production'? 'proddybabay' : error.stack,
    })
};

export {notFound, errorHandler};
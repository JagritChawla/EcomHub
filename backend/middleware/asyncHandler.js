const asyncHandler = fn =>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}

export default asyncHandler;

//it is used to reduce the overhead of try-catch blocks
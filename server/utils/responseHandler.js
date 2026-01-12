const successResponse = (res, statusCode ,code, message, data=null) =>{
  return res.status(statusCode).json({
    status: "success",
    code,
    message,
    data
  })
}

const errorResponse = (res , statusCode , code , message , errors = null) =>{
  return res.status(statusCode).json({
    status: "error",
    code,
    message,
    errors
  })
}

export {successResponse ,errorResponse};
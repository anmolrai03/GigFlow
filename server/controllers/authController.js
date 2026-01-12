import { errorResponse , successResponse } from '../utils/responseHandler.js';

import User from '../models/UserModel.js';


const registerController = async (req , res) => {
  const {name , email , password} = req.body;

  try {
    //FIND IF EMAIL ALREADY IN USE
    const existingUser = await User.findOne({email});

    if( existingUser ) {
      return errorResponse(
        res , 
        409,
        "EMAIL_ALREADY_EXISTS",
        "Email already in use.",
        [{field: "email" , message:"This email has already been registered"}]
      )
    }

    //CREATE NEW USER
    await User.create({
      name , email, password
    });

    // SEND RESPONSE
    return successResponse(
      res,
      201,
      "USER_CREATED_SUCCESSFULLY",
      "User Registered!!"
    )


  } catch (error) {
    console.error("Error Occured: ", error);
    return errorResponse(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Error in server"
    )
  }

}

const loginController = async (req , res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email}).select("+password");

    if( !user ){
      return errorResponse(
        res,
        404,
        "USER_NOT_REGISTERED",
        "The user with this email do not exists.",
        [{field: "email" , message: "Email not found"}]
      )
    }

    const isAuthenticUser = await user.comparePassword(password);

    if( !isAuthenticUser ){
      return errorResponse(
        res,
        401,
        "USER_UNAUTHENTICATED",
        "Invalid credentials, check your password.",
        [{field: "password" , message: "Invalid Password"}]
      )
    }

    // GENERATE ACCESS TOKEN USING JWT
    const accessToken = user.generateAccessToken();

    // ADD COOKIE
    res.cookie("accessToken", accessToken , {
      httpOnly: true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: "strict"
    })

    return successResponse(
      res,
      200,
      "USER_AUTHENTICATED",
      "User logged in successfully.",
      {id: user._id, name: user.name , email: user.email},
    )

  } catch (error) {
    console.error( "Error in server: " , error);
    return errorResponse(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Error in server"
    )
  }
}

const logoutController = async (req , res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict"
  })

  return successResponse(
    res,
    200,
    "LOGGED_OUT",
    "User logged out"
  )
}

export {registerController , loginController , logoutController};
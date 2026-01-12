import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    password:{
      type: String,
      required: true,
      minlength: 8,
      select: false
    }
  }, 
  {timestamps: true}
)

userSchema.pre(
  "save" , async function() {
    if( !this.isModified('password') ) return;
    this.password = await bcrypt.hash(this.password , 10);
  }
)

userSchema.methods.comparePassword = function(currPassword) {
  return bcrypt.compare(currPassword , this.password);
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d"
    }
  )
}

const User = mongoose.model("User" , userSchema)
export default User;
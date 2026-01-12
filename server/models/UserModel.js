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
  "save" , async function(next) {
    if( !this.isModified('password') ) return;
    this.password = await bcrypt.hash(this.password , 10);
  }
)

userSchema.methods.comparePassword = async function(currPassword) {
  return await bcrypt.compare(currPassword , this.password);
}

userSchema.methods.generateAccessToken = async function() {
  const accessToken = jwt.sign(
    // pass
  )
}

const User = mongoose.model("User" , userSchema)
export default User;
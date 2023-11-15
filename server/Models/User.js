import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
        type: String,
        required: true,
      },
    Password: {
      type: String,
      required: true,
    },
    WishListedProducts:[],
    CartProducts:[],
  },
  { timestamps: true } 
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
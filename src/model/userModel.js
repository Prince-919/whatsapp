import mongoose, { mongo } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: [true, "This email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email address"],
    },
    picture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK6lqZS493h8S9R6r6AddiJwevr15EG-XE5Q&usqp=CAU",
    },
    status: {
      type: String,
      default: "hey there ! I am using whatsapp",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [
        6,
        "Please make sure your password is atleast 6 characters long",
      ],
      maxLength: [
        128,
        "Please make sure your password is less than 128 characters long",
      ],
    },
  },
  { collection: "users", timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;

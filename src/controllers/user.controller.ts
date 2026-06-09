import e from "express";
import { User } from "../models/User";

export const createUser = async (
  chatId: string,
  email: string
) => {
  try {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return {
        success: false,
        message: "Invalid email"
      };
    }
    const checkExistUser = await User.findOne({ email });
    if (checkExistUser) {
      return {
        success: false,
        message: "User already exists"
      };
    }
    const user = await User.create({
      chatId,
      email,
    });
    return {
      success: true,
      message: "Account Created"
    };
  } catch (err) {
    return {
      success: false,
      message: 'create user faile'

    }
  }
};
import mongoose from "mongoose";

export const EditUser = async (userId: string, email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { success: false, message: "Invalid email" };
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return { success: false, message: "Invalid userId" };
  }
  const result = await User.updateOne(
    { _id: userId },
    { $set: { email: email } }
  );
  if (result.matchedCount === 0) {
    return { success: false, message: "User not found" };
  }
  return { success: true, message: "Email updated" };
};
// export const createUser = async (
//   req: Request,
//   res: Response
// ) => {

//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }


//     const user = await User.create({
//       email
//     });

//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `${error}`,
//     });
//   }
// };


// export const fetchDataUser = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find()
//     res.status(200).json({
//       success: true,
//       count : users.length,
//       data: users
//     })
//   }
//   catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     })
//   }
// }
import { Request, Response } from "express";
import { User } from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
) => {

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }


    const user = await User.create({
      email
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error}`,
    });
  }
};


export const fetchDataUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      count : users.length,
      data: users
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
}
import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });
    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    // Refresh Token
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.table({ access_token, refresh_token });

    res.json({
      message: "Register successfully",
      access_token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    // Refresh Token
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.table({ access_token, refresh_token });

    res.json({
      message: "Login successfully",
      access_token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });
    res.json({
      message: "Logged out!",
    });
  } catch (error) {
    next(error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized("Please Login!");
    }
    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await findUser(check.userId);
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      access_token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });
    res.json(check);
  } catch (error) {
    next(error);
  }
};

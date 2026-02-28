const blacklistModel = require("../model/blacklist.model");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const istokenblackelist =await blacklistModel.findOne({token})

  if(token){
    return res.status(401).json({
      message:"Invalid token"
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
module.exports = {
  authMiddleware,
};

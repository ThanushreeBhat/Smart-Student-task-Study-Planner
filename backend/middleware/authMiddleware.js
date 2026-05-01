import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("Not authorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
  req.user = decoded;
  next();
};
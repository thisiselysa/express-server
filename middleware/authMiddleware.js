import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // cek header ada atau tidak
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized - Token tidak ada",
      });
    }

    // ambil token
    const token = authHeader.split(" ")[1];

    // verifikasi token
    const decoded = jwt.verify(token, "SECRET_KEY");

    // simpan user info ke request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token tidak valid",
    });
  }
};
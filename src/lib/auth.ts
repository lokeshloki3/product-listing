import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; userId: string };
  } catch {
    return null;
  }
}

import { ratelimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(req.ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests try later",
      });
    }

    next();
  } catch (error) {
    console.log("Rage limiting error.");
    next(error);
  }
};

export default rateLimiter;

import Redis from "ioredis";
import express from "express"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

const app = express()

app.use(express.json())

app.get("/redis", async (res, req) => {
    const reply = await redis.ping();
    res.json({redis:reply});
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

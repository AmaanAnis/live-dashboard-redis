import Redis from "ioredis";
import express from "express"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6397")

app = express()

app.use(express.json())

console.log(redis.incr())
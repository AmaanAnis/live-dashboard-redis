import Redis from "ioredis";
import express from "express"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

const app = express()

app.use(express.json())

app.get("/redis", async (req, res) => {
    const reply = await redis.ping();
    res.json({redis:reply});
})

app.post("/post/:id/view", async (req, res) => {
    const newVal = await redis.incr("post-view-counter");
    res.json({redis:newVal})
    
})

app.post("/leaderboard/score", async(req, res) => {
    const key = req.body.leaderboard
    const score = req.body.score
    const member = req.body.member

    const incrScore = await redis.zincrby(key, score, member) 
    res.json({redis:incrScore})
})

app.get("/leaderboard", async(req, res) => {
    const topTen = await redis.zrevrange(1, 10)
    res.json({redis:topTen})
})

app.get("/leaderboard/:userid/rank", async (req, res) => {
    const userRank = await redis.zrevrank() 
    res.json({redis:userRank})
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

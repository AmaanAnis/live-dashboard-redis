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
    const { leaderboard, score, member } = req.body

    const incrScore = await redis.zincrby(leaderboard, score, member) 
    res.json({redis:incrScore})
})

app.get("/leaderboard/:players", async(req, res) => {

    const {players} = req.params

    const topTen = await redis.zrevrange(leaderboard, 0, 9, "WITHSCORES")
    res.json({redis:topTen})
})

app.get("/leaderboard/:players/:userid/rank", async (req, res) => {

    const {players, userid} = req.params
    const userRank = await redis.zrevrank(players, userid) 
    res.json({redis:userRank})
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

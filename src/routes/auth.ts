import express from "express"

const router = express.Router();

router.post('/signin', (req, res) => {
    res.json({
        msg: 'all right'
    })
})

router.post('/signup', (req, res) => {
    res.json({
        msg: 'all right'
    })
})


export default router; 
import express from "express"

const router = express.Router();

router.get('/getJobs', (req, res) => {
    res.json({
        msg: 'all right'
    })
})

router.post('/postJob', (req, res) => {
    res.json({
        msg: 'all right'
    })
})

router.get('/getApplied', (req, res) => {
    res.json({
        msg: 'all right'
    })
})

router.get('/getApplicationReceived', (req, res) => {
    res.json({
        msg: 'all right'
    })
})


router.get('/getUserInfo/:id', (req, res) => {
    res.json({
        msg: 'all right'
    })
})


router.get('/userWork', (req, res) => {
    res.json({
        msg: 'all right'
    })
})


export default router;
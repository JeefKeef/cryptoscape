const router = require("express").Router();
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");

//get watchlist
router.get("/:userId", async (req, res) => {
  try {
    const currUser = await User.findById(req.params.userId);
    const watchlist = await Watchlist.find({ userId: currUser._id });
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add to watchlist
router.post("/", async (req, res) => {
  const newWatchlist = new Watchlist(req.body);
  try {
    await newWatchlist.save();
    res.status(200).json("Added to watchlist");
  } catch (err) {
    res.status(500).json(err);
  }
});

//update add watchlist
router.put("/add", async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.body.watchlistId);
    if (watchlist.userId === req.body.userId) {
      if (!watchlist.userWatchlist.includes(req.body.cryptoId)) {
        await watchlist.updateOne({
          $push: { userWatchlist: req.body.cryptoId },
        });
        res.status(200).json("Added to watchlist");
      } else {
          res.status(403).json("Already have crypto in your watchlist");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//update delete watchlist
router.put("/delete", async(req, res) => {
    try{
        const watchlist = await Watchlist.findById(req.body.watchlistId);
        if(watchlist.userWatchlist.includes(req.body.cryptoId)) {
            await watchlist.updateOne({
                $pull:{userWatchlist: req.body.cryptoId}
            });
            res.status(200).json("Removed crypto from watchlist");
        } else {
            res.status(403).json("Crypto doesn't exist in watchlist");
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;
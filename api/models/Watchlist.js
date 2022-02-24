const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema (
    {
        userId: {
            type: String,
            require: true,
        },
        userWatchlist: {
            type: Array,
            default:[],
        }
    }
);

module.exports = mongoose.model("Watchlist", WatchlistSchema);
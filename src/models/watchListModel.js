import mongoose from "./index.js";

const watchListSchema = new mongoose.Schema({
    watchList_id: { type : String, required : true },
    movie_id : {type : String, required : true},
    user_id : {type : String, required : true}
});

const WatchList = mongoose.model('watchList', watchListSchema);
export default WatchList;

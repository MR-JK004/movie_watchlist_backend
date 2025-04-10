import WatchList from "../models/watchListModel";
import Function from '../common/Function.js'

const addToWatchList = async (req, res) => {
    try {
        const {id} = req.params;
        
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
}



export default {
    addToWatchList
}
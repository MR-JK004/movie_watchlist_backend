import mongoose from "./index.js";

const movieSchema = new mongoose.Schema({
    movie_id: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    region: {type:String, required: true},
    cast: { type: String, required: true },
    imdb: { type: Number, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;

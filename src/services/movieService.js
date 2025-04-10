import Function from '../common/Function.js';
import movieModel from '../models/movieModel.js';
import axios from 'axios';

const addMovie = async (req, res) => {
    try {
        const { title, image, description, director, genre, year, cast, imdb } = req.body;
        let movieId = Function.generateRandomMovieId();

        if (!title || !image || !description || !director || !genre || !year || !cast || !imdb) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingMovie = await movieModel.findOne({ title });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie with this title already exists' });
        }
        
        const newMovie = await movieModel.create({...req.body,movie_id:movieId});

        res.status(201).send({
            message: 'Movie added successfully',
            movie: newMovie
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'
        });
    }
};


const getAllMovies = async (req, res) => {
    try {
      const allMovies = [];
  
      for (let page = 1; page <= 1; page++) {
        const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            timeout:20000,
            api_key: "2d30d4b184e9f0394d6e01d8326fc65f",
            language: "ta-IN",
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page:1,
            "primary_release_date.gte": "2000-01-01",
            with_original_language: "ta"
          }
        });
  
        allMovies.push(...response.data.results);
      }
  
      res.json(allMovies);
    } catch (error) {
      console.error("TMDb Fetch Error:", error.response?.data || error.message); // ✅ log the response error
      res.status(500).json({ message: "Error fetching movies" });
    }
  };  

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image, description, director, genre, year, cast, imdb } = req.body;

        const movie = await movieModel.findOne({movie_id:id});
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (title) movie.title = title;
        if (image) movie.image = image;
        if (description) movie.description = description;
        if (director) movie.director = director;
        if (genre) movie.genre = genre;
        if (year) movie.year = year;
        if (cast) movie.cast = cast;
        if (imdb) movie.imdb = imdb;

        const updatedMovie = await movie.save();

        res.status(200).json({
            message: 'Movie updated successfully',
            movie: updatedMovie
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};


const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await movieModel.findOne({movie_id: id})

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({
            message: "Movie fetched successfully",
            movie
        });

    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await movieModel.findOneAndDelete({ movie_id: id });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({
            message: 'Movie deleted successfully',
            movie
        });
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};


export default {
    addMovie,
    updateMovie,
    getAllMovies,
    getMovieById,
    deleteMovie
};

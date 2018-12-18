const create_database = "CREATE DATABASE IF NOT EXISTS hypertube";

const drop_database = "DROP DATABASE IF EXISTS hypertube";

const create_table_movies = `CREATE TABLE IF NOT EXISTS movies
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        movie_id VARCHAR(50) NOT NULL,
        title VARCHAR(255),
        year INT,
        language VARCHAR(255),
        type VARCHAR(255),
        rating FLOAT DEFAULT 0,
        runtime INT NOT NULL,
        director TEXT,
        writer TEXT,
        actors TEXT,
        description TEXT,
        img TEXT
    )`;

const create_table_movies_genre = `CREATE TABLE IF NOT EXISTS genre
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        movie_id VARCHAR(50) NOT NULL,
        genre VARCHAR(255) NOT NULL
    )`;

const create_table_movies_torrent = `CREATE TABLE IF NOT EXISTS torrent
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        movie_id VARCHAR(50) NOT NULL,
        url TEXT NOT NULL,
        quality VARCHAR(10) NOT NULL,
        seeds INT NOT NULL,
        peers INT NOT NULL,
        size_bytes BIGINT
    )`;

const create_table_movies_file = `CREATE TABLE IF NOT EXISTS file
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        movie_id VARCHAR(50) NOT NULL,
        quality VARCHAR(10) NOT NULL,
        path TEXT NOT NULL
    )`;

const create_table_movies_subtitle = `CREATE TABLE IF NOT EXISTS subtitle
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        movie_id VARCHAR(50) NOT NULL,
        language VARCHAR(50) NOT NULL,
        path TEXT NOT NULL
    )`;

const add_movie = "INSERT INTO movies (movie_id, title, year, language, type, rating, runtime, director, writer, actors, description, img) VALUES ?";
const get_all_movies = "SELECT * FROM movies";
const get_all_movies_by_rating = "SELECT * FROM movies ORDER BY rating DESC LIMIT 20";
const add_movie_genre = "INSERT INTO genre (movie_id, genre) VALUES ?";
const add_movie_torrent = "INSERT INTO torrent (movie_id, url, quality, seeds, peers, size_bytes) VALUES ?";
const check_movie_exists = "SELECT * FROM movies WHERE movie_id=?";
const get_movie = "SELECT * FROM movies WHERE movie_id=?";
const get_movie_genre = "SELECT * FROM genre WHERE movie_id=?";
const get_movie_torrent = "SELECT * FROM torrent WHERE movie_id=?";
const add_movie_file = "INSERT INTO file (movie_id, quality, path) VALUES ?";
const add_movie_subtitle = "INSERT INTO subtitle (movie_id, language, path) VALUES ?";
const get_movie_file = "SELECT path FROM file WHERE movie_id=? AND quality=?";
const get_movie_subtitle = "SELECT * FROM subtitle WHERE movie_id=?";
const get_all_genre = "SELECT genre FROM genre GROUP BY genre HAVING COUNT(genre) > 10";

module.exports = {
    create_database: create_database,
    drop_database: drop_database,
    create_table_movies: create_table_movies,
    create_table_movies_genre: create_table_movies_genre,
    create_table_movies_torrent: create_table_movies_torrent,
    create_table_movies_file: create_table_movies_file,
    create_table_movies_subtitle: create_table_movies_subtitle,
    add_movie: add_movie,
    get_all_movies: get_all_movies,
    get_all_movies_by_rating: get_all_movies_by_rating,
    get_movie: get_movie,
    get_movie_genre: get_movie_genre,
    get_movie_torrent: get_movie_torrent,
    add_movie_genre: add_movie_genre,
    add_movie_torrent: add_movie_torrent,
    check_movie_exists: check_movie_exists,
    add_movie_file: add_movie_file,
    add_movie_subtitle: add_movie_subtitle,
    get_movie_file: get_movie_file,
    get_movie_subtitle: get_movie_subtitle,
    get_all_genre: get_all_genre
};
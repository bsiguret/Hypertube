const create_database = "CREATE DATABASE IF NOT EXISTS hypertube";

const drop_database = "DROP DATABASE IF EXISTS hypertube";

const create_table_users = `CREATE TABLE IF NOT EXISTS users
	(
		id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
		lastname VARCHAR(30) NOT NULL,
		firstname VARCHAR (30) NOT NULL,
		username VARCHAR(30) NOT NULL UNIQUE,
		password VARCHAR(100) NOT NULL,
		email VARCHAR(100) NOT NULL UNIQUE,
		language VARCHAR(2) NOT NULL DEFAULT 'en',
		profile TEXT NOT NULL,
		token VARCHAR(100),
		isVerified INT DEFAULT 0
	)`;

const create_table_movies = `CREATE TABLE IF NOT EXISTS movies
	(
		id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
		movie_id VARCHAR(50) NOT NULL,
		title VARCHAR(100) UNIQUE,
		year INT,
		language VARCHAR(2),
		type VARCHAR(30),
		rating FLOAT DEFAULT 0,
		runtime INT NOT NULL,
		director TEXT,
		writer TEXT,
		actors TEXT,
		description TEXT,
		img TEXT
	)`;

const create_table_movies_viewed = `CREATE TABLE IF NOT EXISTS viewed
	(
		id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
		uid INT NOT NULL,
		movie_id VARCHAR(50) NOT NULL
	)`;

const create_table_movies_genre = `CREATE TABLE IF NOT EXISTS genre
	(
		id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
		movie_id VARCHAR(50) NOT NULL,
		genre ENUM('Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
			'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir',
			'History', 'Horror', 'Music', 'Musical', 'Mystery', 'News', 'Reality-TV',
			'Romance', 'Sci-Fi', 'science-fiction', 'short', 'Sport', 'Talk-Show', 'Thriller',
			'tv-movie', 'War', 'Western'
		)
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
		language VARCHAR(2) NOT NULL,
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

const insert_user = "INSERT INTO users (lastname,firstname,username,password,email,profile) VALUES(?)";
const get_user = "SELECT * FROM users WHERE id=? || username=? || email=?";

module.exports = {
	create_database: create_database,
	drop_database: drop_database,
	create_table_users: create_table_users,
	create_table_movies: create_table_movies,
	create_table_movies_viewed: create_table_movies_viewed,
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
	get_all_genre: get_all_genre,
	insert_user: insert_user,
	get_user: get_user,
};
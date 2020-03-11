const baseUrl = "https://api.themoviedb.org/3/";

export const fetchTrendingMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}trending/movie/day?api_key=${process.env.REACT_APP_API}&language=en-US&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const fetchPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const fetchNewMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&release_date.lte=2020-03-08&vote_count.gte=20&vote_average.gte=4&with_runtime.gte=60`
  );
  const data = await response.json();
  return data;
};

export const searchMovie = async (query = "", page = 1) => {
  const response = await fetch(
    `${baseUrl}search/movie?api_key=${process.env.REACT_APP_API}&query=${query}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async movieId => {
  const response = await fetch(
    `${baseUrl}${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`
  );
  const data = response.json();
  const details = {
    ...data,
    year: data.release_date.split("-")[0],
    genres: data.genres.map(genre => genre.name)
  };
  return details;
};

export const getCast = async movieId => {
  const response = await fetch(
    `${baseUrl}${movieId}/credits?api_key=${process.env.REACT_APP_API}`
  );
  const data = response.json();
  const cast = data.map(actor => ({
    name: actor.name,
    character: actor.character,
    profile_path: actor.profile_path
  }));
  return cast;
};

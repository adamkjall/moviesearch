const baseUrl = "https://api.themoviedb.org/3/";
export const baseImgUrl = "https://image.tmdb.org/t/p/original";

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}trending/movie/day?api_key=${process.env.REACT_APP_API}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-03-08&vote_count.gte=20&vote_average.gte=4&with_runtime.gte=60`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovie = async query => {
  try {
    const response = await fetch(
      `${baseUrl}search/movie?api_key=${process.env.REACT_APP_API}&query=${query}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await fetch(
      `${baseUrl}movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCast = async movieId => {
  try {
    const response = await fetch(
      `${baseUrl}movie/${movieId}/credits?api_key=${process.env.REACT_APP_API}`
    );
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.log(error);
  }
};

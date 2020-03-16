const baseUrl = "https://api.themoviedb.org/3/";
export const baseImgUrl = "https://image.tmdb.org/t/p/original";

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${baseUrl}trending/movie/day?api_key=${process.env.REACT_APP_API}&language=en-US&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&release_date.lte=2020-03-08&vote_count.gte=20&vote_average.gte=4&with_runtime.gte=60`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovie = async (query = "", page = 1) => {
  try {
    const response = await fetch(
      `${baseUrl}search/movie?api_key=${process.env.REACT_APP_API}&query=${query}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async movieId => {
  const response = await fetch(
    `${baseUrl}movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US&append_to_response=videos,reviews`
  );
  const data = response.json();
  return data;
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

export const getVideos = async movieId => {
  try {
    const response = await fetch(
      `${baseUrl}movie/${movieId}/videos?api_key=${process.env.REACT_APP_API}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieFunction = (
  category = "trending",
  page = 1,
  query = " "
) => {
  switch (category) {
    case "search":
      return searchMovie(query, page);
    case "popular":
      return fetchPopularMovies(page);
    case "new":
      return fetchNewMovies(page);
    case "trending":
      return fetchTrendingMovies(page);
    default:
      return fetchTrendingMovies(page);
  }
};

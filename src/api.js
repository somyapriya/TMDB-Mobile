const loadingUrl = "https://api.themoviedb.org/3/search/movie?api_key=c8b4f506226fb26566c0687c47a7207e&language=en-US&query=movies&page=1&include_adult=false";

export const searchCall = (searchText, onSuccess, onFail) => {
    const searchURl = `https://api.themoviedb.org/3/search/movie?api_key=c8b4f506226fb26566c0687c47a7207e&language=en-US&query=${searchText}&page=1&include_adult=false`
    fetch(searchURl).then((response) => response.json())
        .then(onSuccess, onFail);
}

export const fetchMovies = (onSuccess, onFail) => {
    fetch(loadingUrl).then((response) => response.json())
        .then(onSuccess, onFail);
}
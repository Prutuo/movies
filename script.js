const apiKey = 'bd1e77ed2c8a0a156c6f75e26fb8896b'; // Your TMDb API key

const searchInput = document.querySelector('.search-box');
const movieList = document.querySelector('.movie-list');
let timeoutId;

// Function to fetch and display movies
function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      movieList.innerHTML = ''; // Clear previous results
      data.results.forEach(movie => {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        if (movie.poster_path) {
          image.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
          image.alt = movie.title;
        } else {
          image.src = 'https://raw.githubusercontent.com/prutuo/movies/main/404.png';
          image.alt = 'Poster Not Available';
        }
        image.addEventListener('click', () => {
          openEmbeddedPlayerInNewTab(movie.id); // Open embedded player in new tab with movie ID
        });
        listItem.appendChild(image);
        const title = document.createElement('p');
        title.textContent = movie.title;
        listItem.appendChild(title);
        movieList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to open embedded player in new tab with movie ID
function openEmbeddedPlayerInNewTab(movieId) {
  // Open a new tab with the embedded player URL
  window.open(`https://vidsrc.pro/embed/movie/${movieId}`, '_blank');
}

// Function to fetch and display popular movies on page load
function fetchPopularMovies() {
  fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
}

// Call the function to fetch and display popular movies on page load
fetchPopularMovies();

// Event listener for search input
searchInput.addEventListener('input', function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const query = this.value.trim();
    if (query !== '') {
      fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    } else {
      fetchPopularMovies(); // If search input is empty, fetch and display popular movies again
    }
  }, 500); // Delay search by 500 milliseconds
});

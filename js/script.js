const searchBar = document.getElementById("searchBar");
const searchDownbar = document.getElementById("searchRes");

var favMovie = [];

function inputHandle(e) {
  let result = e.target.value;
  handleMovieTitle(result);
  findMovies();
}

function handleFavBtn(e, data) {
  e.preventDefault();
  searchDownbar.innerHTML = "";
  let favMovie = JSON.parse(localStorage.getItem("favourite movies")) || [];
  let tempData = favMovie.some((movie) => movie.imdbID === data.imdbID);
  if (!tempData) {
    favMovie.push(data);
    localStorage.setItem("favourite movies", JSON.stringify(favMovie));
  } else {
    alert("Movie already exist in favourites");
  }
}

// fetch data from api
async function handleMovieTitle(result) {
  searchDownbar.innerHTML = "";
  if (result.length > 2) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=9eaa14cb&t=${result}`
    );
    let data = await res.json();
    if (data.Response === "False") {
      console.log("not found");
      return;
    } else {
      searchDownbar.innerHTML = `

                <div class="poster_container container">
                    <img src=${data.Poster} alt="movie-poster"></img>
                </div>

                <div class="card-body" ">
                      <div id="header_container">
                          <h2 class = "card-title">${data.Title}</h2>
                          <i id="info" class="fas fa-info-circle fa-2x"></i>
                      </div>
                      <br>
                    <p class="card-text" ><b>Actors :</b> ${data.Actors}</p>
                    <p class="card-text"><b>Year :</b> ${data.Year}</p>
                    <p class="card-text"><b>IMDB Rating :</b> ${data.imdbRating}</p>
                    <button id="fav_btn" class="btn btn-outline-danger" type="submit" > My Favourite Movie </button>
                </div>

            `;

      // add click event
      document
        .getElementById("fav_btn")
        .addEventListener("click", (e) => handleFavBtn(e, data));

      // call info.html
      function openPage() {
        localStorage.setItem("Movie Information", JSON.stringify(data));
        parent.location = "./html/info.html";
      }

      document.getElementById("info").addEventListener("click", openPage);
    }
  }
}

searchBar.addEventListener("input", inputHandle);

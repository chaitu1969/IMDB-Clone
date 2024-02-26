const favList = document.getElementById("listFav");

let favMovieList = [];

function removeMovie(index) {
  let data = JSON.parse(localStorage.getItem("favourite movies"));
  data.splice(index, 1);
  localStorage.setItem("favourite movies", JSON.stringify(data));
  window.location.reload();
}

function openPage(index) {
  let element = favMovieList[index];
  localStorage.setItem("Movie Information", JSON.stringify(element));
  parent.location = "../html/info.html";
}

function handleFavMovies() {
  const favMovieList =
    JSON.parse(localStorage.getItem("favourite movies")) || [];
  const fragment = document.createDocumentFragment();

  favMovieList.forEach((element, index) => {
    const listItem = document.createElement("li");
    listItem.className = "card mb-3";
    listItem.style.maxWidth = "540px";
    listItem.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src=${element.Poster} class="img-fluid rounded-start" alt="movie_poster">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div id="header_container">
              <h2 class="card-title">${element.Title}</h2>
              <button id="info_btn" onclick="openPage(${index})">
                <i id="info" class="fas fa-info-circle fa-2x"></i>
              </button>
            </div>
            <p class="card-text"><b>Actors :</b> ${element.Actors}</p>
            <!-- More content here -->
          </div>
          <div class="card-body" id="remove_btn">
            <button class="btn btn-danger" id='delete_movie' onclick="removeMovie(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;
    fragment.appendChild(listItem);
  });

  favList.appendChild(fragment);
}

handleFavMovies();

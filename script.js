// const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzBlOTQ4NWFmYjQ3NWE0NTQxZGJiMjNhMTk1ZWUyMiIsInN1YiI6IjY2MmEzOTE0MGRlYTZlMDExZTc2MDI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3REd_kkIq-H3IisqXP89OIipWeUJUQFN4BivSz7Xhw'
    }
};

// API -> 데이터
// fetch를 실행하고 나온 결과가 promise, 즉 .then은 promise.then 이다.
fetch(url, options)
    .then(res => res.json())
    // .then(json => console.log(json)) // api 내용 출력
    .then(data => {
        // 카드 컨테이너 요소를 선택합니다.
        const cardContainer = document.querySelector(".card-list");

        // API에서 가져온 데이터를 반복문(화살표문?)을 사용해서 가져오기
        data.results.forEach(movie => {
            const card = createMovieCard(movie); // 카드 만들기 함수 적용

            card.addEventListener('click', function() {
                // 카드를 클릭할 때 해당하는 영화 ID를 알림창으로 표시합니다.
                alert("해당 영화의 id는 " + movie.id);
            });

            // 만들어진 api 데이터 카드를 카드 컨테이너에 추가합니다.
            cardContainer.appendChild(card);
        });

        // 검색 이벤트 dom
        document.getElementById("search-btn").onclick = function (event) {
            let userInput = document.getElementById('search-input').value;
            filterMovies(data, userInput, cardContainer);

            card.addEventListener('click', function() {
                // 카드를 클릭할 때 해당하는 영화 ID를 알림창으로 표시합니다.
                alert("해당 영화의 id는 " + movie.id);
            });

            event.preventDefault();
            // <form>은 기본적으로 내부 button을 누르면 데이터를
            // 어딘가로 보낸 후 페이지를 새로고침 합니다.ㅈㅈ
            // 그렇기 때문에 search 기능을 구현하기 위해서는
            // 페이지 새로고침을 방지해야 하며
            // 이는 event.preventDefault 을 통해 구현할 수 있습니다.
        }

        // 엔터키 검색 이벤트 dom
        // Uncaught (in promise) TypeError: Cannot read properties of null (reading 'addEventListener')
        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('movieInput').addEventListener('keydown', function (event) {
                
                // if (event.keyCode === 13) { // @deprecated
                                            // 작동은 되지만 추후 없어질 기능
                if (event.key === 13) {
                    let userInput = document.getElementById('search-input').value;
                    filterMovies(data, userInput, cardContainer);
                }

                card.addEventListener('click', function() {
                    // 카드를 클릭할 때 해당하는 영화 ID를 알림창으로 표시합니다.
                    alert("해당 영화의 id는 " + movie.id);
                });
            });
        });

        // getElementsByClassName의 경우 복수형이라 배열로 값을 받아오기에
        // 동작하지 않음
        // document.getElementsByClassName("movie-card").onclick = function() {
        //     alert(movieId);
        // }
    })
// .catch(err => console.error('error:' + err));

function createMovieCard(movie) {
    // dom 함수 중 createElement를 사용하여 div 속성 및 클래스 이름으로 카드 생성
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // 영화 포스터 추가
    const poster = document.createElement("img");
    poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path; // 앞의 주소는 동일
    poster.classList.add("card-img");

    // 카드 본문을 추가합니다.
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // 영화 제목
    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = movie.title;

    // 영화 내용
    const overview = document.createElement("p");
    overview.classList.add("card-text");
    overview.textContent = movie.overview;

    // 영화 점수
    const voteAverage = document.createElement("p");
    voteAverage.classList.add("card-voteAverage");
    voteAverage.textContent = "vote: " + movie.vote_average;

    // api 중 id를 저장
    card.dataset.movieId = movie.id;

    // 위에서 빼둔 내용을 카드에 추가
    card.appendChild(title);
    card.appendChild(poster);
    card.appendChild(overview);
    card.appendChild(cardBody);
    card.appendChild(voteAverage);
    

    return card; // api 데이터로 만들어진 카드를 리턴
}

function filterMovies(data, userInput, cardContainer) {
    // 검색한 내용을 바탕으로 영화 필터링
    // 입력한 영화 제목을 소문자화하여 저장
    const filterMovie = data.results.filter(movie => movie.title.toLowerCase().includes(userInput.toLowerCase()));
    // 카드 컨테이너를 초기화
    cardContainer.innerHTML = '';
    console.log("filter");

    // 필터링 된 영화 제목으로 추려진 영화를 가지고 카드 생성
    filterMovie.forEach(movie => {
        const card = createMovieCard(movie);
        cardContainer.appendChild(card);
    });
}

// const renderMovies = movies => {
//     movies.forEach(movie => {
//         const movieCard = createMovieCard(movie);
//         moviesContainer.appendChild(movieCard);
//     });
// };
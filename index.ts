interface JokeReview {
    joke: string;
    score: number;
    date: string;
}

//buttons
const nextJokeButton = document.getElementById('next-joke');
const BtnLike = document.getElementById('emoji-like');
const BtnOk = document.getElementById('emoji-ok');
const BtnDislike = document.getElementById('emoji-dislike');

//Array of reports
let reportJokes : JokeReview[] = [];

//DOM elements
const jokeElement = document.getElementById('joke');
const weatherElement = document.getElementById('weather-info');

async function getDadJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        return data.joke;
    } catch (error) {
        console.error('Error getting dad joke', error);
        return 'Error getting dad joke';
    }
}

async function getChuckJoke() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error('Error getting Chuck joke', error);
        return 'Error getting Chuck joke';
    }
}

async function showJoke() {
    if (jokeElement) {
        const random = Math.floor(Math.random() * 2);
        jokeElement.innerHTML = random === 0 ? await getDadJoke() : await getChuckJoke();
    }
}

if (nextJokeButton) {
    nextJokeButton.addEventListener('click', showJoke);
    nextJokeButton.addEventListener('click', changeBackground);
}

showJoke();

//reviews
if (BtnLike) {
    BtnLike.addEventListener('click', () => {
        addJokeReview(3);
    });
}
if (BtnOk) {
    BtnOk.addEventListener('click', () => {
        addJokeReview(2);
    });
}
if (BtnDislike) {
    BtnDislike.addEventListener('click', () => {
        addJokeReview(1);
    });
}

function addJokeReview(score: number){
    let jokeToReview: string = (jokeElement && jokeElement.textContent) || '';
    const existingReview = reportJokes.findIndex(review => review.joke === jokeToReview);
    if(existingReview != -1){
        reportJokes[existingReview].score = score;
        reportJokes[existingReview].date = new Date().toISOString();
        console.log("La valoracio s'ha modificat:", reportJokes);
    }
    else{
        const review : JokeReview = {
            joke: jokeToReview,
            score: score,
            date: new Date().toISOString()
        };
        reportJokes.push(review);
        console.log("S'ha afegit una nova valoració:", reportJokes);
    }
}

//weather info
async function getWeather() {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key=7000b05aaa4a49f2911110936240904&q=Barcelona&aqi=no', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        const weatherTemp = data.current.temp_c;
        const weatherIcon = data.current.condition.icon;
        return { temp: weatherTemp, icon: weatherIcon };
    } catch (error) {
        console.error('Error getting weather', error);
        return 'Error getting weather';
    }
}

async function showWeather() {
    const weather = await getWeather();
    if (weatherElement) {
        if (typeof weather !== 'string') {
            weatherElement.innerHTML = `<img src="https:${weather.icon}" alt="${weather.temp}">| ${weather.temp} °C`;
        } else {
            weatherElement.innerHTML = weather;
        }
    }
}

showWeather()

//background
const backSVGs = ['back1.svg', 'back2.svg', 'back3.svg', 'back4.svg', 'back5.svg', 'back6.svg'];
let i = 0;

function changeBackground() {
    const currentBackSVG = backSVGs[i];
    document.body.style.backgroundImage = `url('/svg/${currentBackSVG}')`;
    i++;
    if (i >= backSVGs.length) {
        i = 0;
    }
}
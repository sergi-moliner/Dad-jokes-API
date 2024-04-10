interface JokeObj {
    id: string;
    joke: string;
    status: number;
}
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
let reportAcudits : JokeReview[] = [];

//DOM elements
const jokeElement = document.getElementById('joke');
const weatherElement = document.getElementById('weather-info');

async function getJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json() as JokeObj;
        return data.joke;
    } catch (error) {
        console.error('Error getting joke', error);
        return 'Error getting joke';
    }
}

async function showJoke() {
    if (jokeElement) {
        const joke = await getJoke();
        jokeElement.innerHTML = joke;
    }
}

if (nextJokeButton) {
    nextJokeButton.addEventListener('click', showJoke);
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
    const jokeToReview : string = jokeElement?.textContent ?? '';
    const existingReview = reportAcudits.findIndex(review => review.joke === jokeToReview);
    if(existingReview != -1){
        reportAcudits[existingReview].score = score;
        reportAcudits[existingReview].date = new Date().toISOString();
        console.log("La valoracio s'ha modificat:", reportAcudits);
    }
    else{
        const review : JokeReview = {
            joke: jokeToReview,
            score: score,
            date: new Date().toISOString()
        };
        reportAcudits.push(review);
        console.log("S'ha afegit una nova valoració:", reportAcudits);
    }
}

//weather info
async function getWeather() {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key=7000b05aaa4a49f2911110936240904&q=Barcelona&aqi=no');
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
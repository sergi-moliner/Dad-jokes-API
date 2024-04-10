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

const jokeElement = document.getElementById('joke');

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

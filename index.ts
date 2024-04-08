interface JokeObj {
    id: string;
    joke: string;
    status: number;
}

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
    const jokeElement = document.getElementById('joke');
    if (jokeElement) {
        const joke = await getJoke();
        jokeElement.innerHTML = joke;
    }
}

const nextJokeButton = document.getElementById('next-joke');
if (nextJokeButton) {
    nextJokeButton.addEventListener('click', showJoke);
}

showJoke();
const home = document.querySelector('#home');
const alertMessage = document.querySelector('.alert-message');
const jokeButton = document.querySelector('.gett-a');
const jokeBuildup = document.querySelector('.buildup');
const jokePunchline = document.querySelector('.punchline');
const plainTextButton = document.querySelector('#plain-text');
const soundButton = document.querySelector('#sound');
const copyButton = document.querySelector('.copy-button');
const copyIcon1 = document.querySelector('.copy-icon1');
const copyIcon2 = document.querySelector('.copy-icon2');
const copyNotif = document.querySelector('#copy-notif');
let joke;
let i;
let buildup = " ";
let punchline = " ";
const drumRoll = new Audio('./Audio/drumroll3.mp3');
const baDumTss = new Audio('./Audio/baDumTss.mp3');


//Home button
home.addEventListener('click', () => {
    location.reload();
    console.log('Reloaded');
});

//Alert function
alertFunction = (message) => {
    alertMessage.innerText = message;
    alertMessage.classList.remove('d-none');
    setTimeout(() => {
        alertMessage.classList.add('d-none');
    }, 5000);
}

//Joke fetch function
const getJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } };
        const req = await axios.get('https://icanhazdadjoke.com/', config);
        return req.data.joke;
    } catch (e) {
        console.log("Joke request error:", e);
        alertFunction("Something went wrong while fetching the joke. Please reload or try again later.");
        return " ";
    }
}

//Joke slice function
const jokeSlice = () => {
    for (i = joke.length - 3; i >= 0; i--) {
        if ((joke[i] == '.') || (joke[i] == '?')) {
            break;
        }
    }
    buildup = joke.slice(0, i + 1);
    punchline = joke.slice(i + 1);
}

//Joke display changer according to plain button
const jokeDisp = () => {
    if (plainTextButton.checked) {
        jokeBuildup.innerText = joke;
        jokePunchline.innerText = " ";
    }
    else {
        jokeBuildup.innerText = buildup;
        if (soundButton.checked && jokeBuildup.innerText.length > 2) {
            drumRoll.play();
        }
        setTimeout(() => {
            if (soundButton.checked && jokeBuildup.innerText.length > 2) {
                baDumTss.play();
            }
            jokePunchline.innerText = punchline;
        }, 2700);
    }
}

//Gett-A button
jokeButton.addEventListener('click', async () => {
    jokeBuildup.innerText = " ";
    jokePunchline.innerText = " ";
    joke = await getJoke();
    jokeSlice();
    jokeDisp();
    copyIcon1.classList.remove('d-none');
    copyIcon2.classList.add('d-none');
});

//Plain Text Button
plainTextButton.addEventListener('input', () => {
    jokeDisp();
})

//Copy function
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

//Copy notif function
copyMessage = () => {
    copyNotif.classList.remove('d-none');
    setTimeout(() => {
        copyNotif.classList.add('d-none');
    }, 1000);
}

//Copy button
copyButton.addEventListener('click', () => {
    copyIcon1.classList.add('d-none');
    copyIcon2.classList.remove('d-none');
    copyToClipboard(joke);
    copyMessage();
});

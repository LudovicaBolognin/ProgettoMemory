// Cronometro partita
let hrs = 0;
let min = 0;
let sec = 0;
let timer;
let cronometro = document.getElementById('cronometro');
let tempoImpiegato = document.getElementById('tempoTrascorso');

function setCronometro() {
    sec++;
    if(sec >= 60) {
        sec = 0;
        min++; 
        if(min >= 60) {
         min = 0;
        }
     }
     print();
}
function print() {
    cronometro.innerHTML = 'Tempo impiegato: ' + (min > 9 ? min : '0'+min) + ' : ' + (sec > 9 ? sec : '0'+sec);
}

function startCronometro() {
    timer = setInterval(setCronometro, 1000);
}

window.onload = startCronometro();

function stopCronometro() {
    clearInterval(timer);
}

function resetCronometro() {
    stopCronometro();
    hrs = 0;
    min = 0;
    sec = 0;
    print();
}


const modale = document.getElementById('modal');
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 15;

//link text
playerLivesCount.textContent = playerLives;

// generazione per carte
const getData = () => [
    { imgSrc: "img/blue.jpg", name: "blue" },
    { imgSrc: "img/blue.jpg", name: "blue" },
    { imgSrc: "img/lake.jpg", name: "lake" },
    { imgSrc: "img/lake.jpg", name: "lake" },
    { imgSrc: "img/multi.jpg", name: "multi" },
    { imgSrc: "img/multi.jpg", name: "multi" },
    { imgSrc: "img/pinkflower.jpg", name: "pinkflower" },
    { imgSrc: "img/pinkflower.jpg", name: "pinkflower" },
    { imgSrc: "img/sakura.jpg", name: "sakura" },
    { imgSrc: "img/sakura.jpg", name: "sakura" },
    { imgSrc: "img/sparkleblue.jpg", name: "sparkleblue" },
    { imgSrc: "img/sparkleblue.jpg", name: "sparkleblue" },
    { imgSrc: "img/verona.jpg", name: "verona" },
    { imgSrc: "img/verona.jpg", name: "verona" },
    { imgSrc: "img/violet.jpg", name: "violet" },
    { imgSrc: "img/violet.jpg", name: "violet" },
];

// Carte randomizzate
const randomize = () => {
    const cardData = getData();    
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Generazione HTML delle carte
const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    // Inserire le immagini ed il nome alle immagini stesse
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    


    // Attaccare la carta alla sezione
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        checkCards(e);
        });
    });
   
};

// Confrontare le carte
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
       
    if(flippedCards.length === 2) {
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log("Match");
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        } else {
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout( () => card.classList.remove('toggleCard'), 900);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                // Se si perde:
                restart("Hai perso, prova di nuovo!");
                startCronometro()
            }        
        }
    }

    // Se si vince il gioco:
    if(toggleCard.length === 16) {
        modale.style.display = "block";
        stopCronometro()
        tempoImpiegato.innerHTML = cronometro.innerHTML;
        //restart("Hai vinto!");
        restartModale();
    }

};

// Ricomincia a giocare
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        setTimeout( () => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'none';
        }, 1300);      
    });
    playerLives = 15;
    playerLivesCount.textContent = playerLives;

    // alert
    setTimeout( () => window.alert(text), 100);
    resetCronometro();
};

cardGenerator();

// Modale
const restartModale = () => {
    resetCronometro();
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        setTimeout( () => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'none';
        }, 1300);      
    });
    playerLives = 15;
    playerLivesCount.textContent = playerLives;

    startCronometro();   
};

// Quando scompare
function closeModal() {
    modale.style.display = "none";
    restartModale();
}
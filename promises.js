// PART 1

let url = 'http://numbersapi.com/'

// 1.
function numFact() {
    axios.get(`${url}1?json`)
        .then(res => {
            console.log(res)
        });
};

// 2.
function factsOfNums() {
    axios.get(`${url}10,20,30,40?json`)
        .then(res => {
            console.log(res.data)
        })
};

// 3.
let ul = document.getElementById('num-facts')

function showNumFacts() {
    for (let i = 0; i < 4; i++) {
        axios.get(`${url}32?json`)
            .then(res => {
                let newLi = document.createElement('li')
                newLi.innerText = res.data.text
                ul.append(newLi)
            })
    }
}

// PART 2
let card = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"

// 1.

function drawCard() {
    axios.get(card)
        .then(res => {
            console.log(res.data)
            return res.data.cards
        })
        .then(res => {
            console.log(`${res[0].value} of ${res[0].suit}`)
        })
}

// 2.
let shuffledDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

function drawNewCard() {
    axios.get(shuffledDeck)
        .then(res => {
            return res.data.deck_id
        })
        .then(res => {
            axios.get(`https://deckofcardsapi.com/api/deck/${res}/draw/?count=1`)
                .then(res => {
                    // console.log(res.data.cards[0].suit, res.data.cards[0].value)
                    return res.data.deck_id
                })
                .then(res => {
                    axios.get(`https://deckofcardsapi.com/api/deck/${res}/draw/?count=1`)
                        .then(res => {
                            // console.log(res.data.cards[0].suit, res.data.cards[0].value)
                        })
                })
        })
}

// 3.

function setup() {
    let btn = document.getElementById('draw');
    let cardArea = document.getElementById('card-area')
    let card = document.createElement('p')

    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => {
            return res.data
        })
        .then(res => {
            btn.onclick = function () {
                let deck_id = res.deck_id
                let cardData = axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
                    .then(res => {
                        if (res.data.remaining === 0) {
                            btn.style.display = 'none'
                            card.innerText = ''
                        }
                        else {
                            card.innerText = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`
                            cardArea.append(card)
                        }
                    })
            }
        })
}
setup()
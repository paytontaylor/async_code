// PART 1

// 1.
const BASE_URL = 'http://numbersapi.com'

async function getFavNum() {
    let res = await axios.get(`${BASE_URL}/32`)
    console.log(res.data)
}
async function getFavNums() {
    let res = await axios.get(`${BASE_URL}/1..5`)
    console.log(res.data)
}
async function getFavNumFacts() {

    let facts = document.getElementById('facts')
    for (let i = 0; i < 4; i++) {
        let new_fact = document.createElement('li')
        let res = await axios.get(`${BASE_URL}/32`)
            .then(res => {
                new_fact.innerText = res.data
                facts.append(new_fact)
            })
    }
}

// PART 2

// 1.
async function getCard() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
}
// 2.
async function getTwoCards() {
    let res1 = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let card1 = `${res1.data.cards[0].value} of ${res1.data.cards[0].suit}`
    let deck_id = res1.data.deck_id
    let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    let card2 = `${res2.data.cards[0].value} of ${res2.data.cards[0].suit}`
    console.log(card1)
    console.log(card2)
}
// 3.
// 3.
async function setup() {
    let btn = document.getElementById('draw');
    let cardArea = document.getElementById('card-area')
    let card = document.createElement('p')

    let deckData = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    let deck_id = deckData.data.deck_id
    btn.onclick = async function () {
        let cardData = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        card = cardData.data.cards[0]
        if (cardData.data.remaining === 0) {
            btn.style.display = "none"
            cardArea.innerText = ''
        }
        else {
            cardArea.innerText = (`${card.value} of ${card.suit}`)
        }
    }
}
setup()
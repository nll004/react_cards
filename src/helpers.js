const BASE_CARD_API_URL = 'http://deckofcardsapi.com/api/deck';

function getAngle(){
    // generate a random angle between 0-40 with pos or neg direction for cards
    const angle = Math.floor(Math.random() * 40);
    const direction = (Math.random() < 0.5) ? '-' : ''; // pos or neg angle

    return direction + angle
}

module.exports = {
    BASE_CARD_API_URL,
    getAngle
}

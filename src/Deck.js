import React, {useState, useEffect} from "react";
import axios from "axios";

const BASE_CARD_API_URL = 'http://deckofcardsapi.com/api/deck';

function Deck(){
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    async function getDeck(){
        const res = await axios.get(`${BASE_CARD_API_URL}/new/shuffle?deck_count=1`)
        setDeck(res.data);
        console.log("Deck", deck)
    };

    async function getCards(){
        const res = await axios.get(`${BASE_CARD_API_URL}/${deck.deck_id}/draw/?count=52`);
        setCards(res.data.cards);
        console.log(cards)
    }

    useEffect(() => getDeck, []);
    useEffect(()=> getCards, [deck]);


    return (
        <h2> Deck </h2>
    )
}


export default Deck;

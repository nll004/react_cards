import React, {useState, useEffect} from "react";
import axios from "axios";

const BASE_CARD_API_URL = 'http://deckofcardsapi.com/api/deck';

function Deck(){
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    async function getDeck(){
        try{
            const res = await axios.get(`${BASE_CARD_API_URL}/new/shuffle?deck_count=1`)
            setDeck(res.data);
            console.log("Deck", deck)
        }
        catch(e){ console.log(e)
        }
    };

    async function getCards(){
        try{
            const res = await axios.get(`${BASE_CARD_API_URL}/${deck.deck_id}/draw/?count=52`);
            setCards(res.data.cards);
            console.log(cards)
        }
        catch(e){ console.log(e)
        }
    }

    useEffect(() => getDeck, []); // I want this to run once at initial render
    useEffect(()=> getCards, [deck]); // I want this to run anytime the deck state is updated

    return (
        <>
        <h2> Deck </h2>
        </>
    )
}


export default Deck;

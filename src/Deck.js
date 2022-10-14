import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Deck.css";

const BASE_CARD_API_URL = 'http://deckofcardsapi.com/api/deck';

function getAngle(){
    // generate a random angle between 0-40 with pos or neg direction for cards
    const angle = Math.floor(Math.random() * 40);
    const direction = (Math.random() < 0.5) ? '-' : ''; // pos or neg angle

    return direction + angle
}


function Deck(){
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);

    async function getDeck(){
        try{
            const res = await axios.get(`${BASE_CARD_API_URL}/new/shuffle?deck_count=1`);
            setDeckId(res.data.deck_id);
            setCards([]);
        }
        catch(e){ console.log(e) }
    };

    async function getCards(){
        try{
            const res = await axios.get(`${BASE_CARD_API_URL}/${deckId}/draw`);
            if(res.data.remaining === 0) alert('Out of cards');
            const newCard = res.data.cards[0];
            newCard.angle = getAngle();
            setCards([...cards, newCard]);
        }
        catch(e){ console.log(e) }
    }

    useEffect(() => getDeck, []);

    return (
        <>
            <div className="button-container">
                <button onClick={getCards}>Draw Card</button>
                <button onClick={getDeck}> New Deck </button>
            </div>

            <div className="card-container">
                {cards && cards.map((c,id) => (
                    <img src={c.image}
                         alt={`${c.value} of ${c.suit}`}
                         key={c.code}
                         className='card'
                         style={{transform: `rotate(${c.angle}deg)`}}
                    ></img>)
                )}
            </div>
        </>
    )
}


export default Deck;

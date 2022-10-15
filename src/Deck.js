import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {BASE_CARD_API_URL, getAngle} from './helpers';
import "./Deck.css";

function Deck(){
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const autoTimer = useRef(null);

    async function getDeck(){
        try{
            const res = await axios.get(`${BASE_CARD_API_URL}/new/shuffle?deck_count=1`);
            setDeckId(res.data.deck_id);
            setCards([]);
        }
        catch(e){ console.log(e) }
    };

    async function getCard(){
        try{
            const res = await axios.get(`${BASE_CARD_API_URL}/${deckId}/draw`);
            const newCard = res.data.cards[0];
            newCard.angle = getAngle();
            setCards([...cards, newCard]);

            if(res.data.remaining === 0) alert('Out of cards');
        }
        catch(e){ console.log(e) }
    }

    function toggleAutoDraw(){
        setAutoDraw(autoDraw => !autoDraw);
    }

    useEffect(() => getDeck, []);
    useEffect(() => {
        if(autoDraw && !autoTimer.current){
            autoTimer.current = setInterval(async () => {
                                    await getCard()}, 1000);
        }
        if (!autoDraw) {
            clearInterval(autoTimer.current);
            autoTimer.current = null;
        }
    })

    return (
        <>
            {autoDraw && <p className="auto-draw-msg">Auto Drawing Cards</p>}
            <div className="button-container">
                <button onClick={getCard}>Draw Card</button>
                {autoDraw && <button onClick={toggleAutoDraw} className='auto-drawing-btn'> Auto Draw </button>}
                {!autoDraw && <button onClick={toggleAutoDraw}> Auto Draw</button>}
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

import React, {useState} from "react";

const BASE_URL = 'https://drive.google.com/file/d/1g3BaU9A_RcIxGprgrDqyqyozDqBLOtgi/view?usp=sharing';

function Deck(){
    const [deck, setDeck] = useState(null)

    const getDeck = async () => {
        console.log('get deck')
        return await axios.get(BASE_URL)
    }
    setDeck(getDeck);

    return (
        <>
            <h2>Deck</h2>
        </>
    )
}

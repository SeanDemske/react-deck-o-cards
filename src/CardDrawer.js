import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DrawnCards from "./DrawnCards";

const CardDrawer = () => {
    const [autoDrawMode, setAutoDrawMode] = useState(false);
    const [cards, setCards] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const deckId = useRef();
    const timerId = useRef();

    const handleClick = async () => {

        if (autoDrawMode) {
            setAutoDrawMode(false);
            clearInterval(timerId.current)
        } else {
            setAutoDrawMode(true);
            timerId.current = setInterval(() => {
                try {
                    const drawCard = async () => {
                        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
                        const drawnCard = res.data.cards[0];
                        if (res.data.remaining === 0) {
                            alert("Deck Empty!")
                            setAutoDrawMode(false);
                            clearInterval(timerId.current)
                            setButtonDisabled(buttonDisabled => true);
                        }
                        setCards(cards => [...cards, drawnCard]);
                    }
                    drawCard();
                } catch {
                    console.log("in catch statement");
                }
            }, 1000)
        }
    }

    useEffect(() => {
        async function loadDeck() {
            try {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle`);
                deckId.current = res.data.deck_id;
            } catch(err) {
                console.log("request failed reload page");
            }
        }
        loadDeck();
    }, [])

    return (
        <div className="CardDrawer">
            <button onClick={handleClick} disabled={buttonDisabled}>{autoDrawMode ? "Stop Drawing" : "Draw Cards"}</button>
            <DrawnCards drawnCards={cards}/>
        </div>
    );
}

export default CardDrawer;
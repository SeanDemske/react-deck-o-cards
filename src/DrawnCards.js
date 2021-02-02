import React from "react";
import Card from "./Card";

const DrawnCards = ({drawnCards}) => {
    return (
        <div className="DrawnCards">
            {drawnCards.map(c => {
                return <Card key={c.code} imgSrc={c.image}/>
            })}
        </div>
    );
}

export default DrawnCards;
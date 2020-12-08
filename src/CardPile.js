
import React from 'react';

export default function CardPile(props){
    return(
        <div >
            {props.Cards.map((card) => <p> {card.Value} {card.Suit}</p>)}
        </div>
        
    )
}
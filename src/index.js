import React from 'react';
import ReactDOM from 'react-dom';


function CardPile(props){
    return(
        <div >
            {props.Cards.map((card) => <p> {card.Value} {card.Suit}</p>)}
        </div>
        
    )
}

function Player(props){
    return(
        <div>
            <p>{props.NumCards}</p>
            <button 
                onClick={() => props.onSlap()} >
                    Slap
            </button>
            <button 
                onClick={() => props.onPlayCard()} 
                disabled={!props.myTurn}>
                    Play Card
            </button>
        </div>       
    )
}


function IsSlapGood(Cards){
    let values = Cards.map((card) => card.values);
    values = values.reverse()
    if(values.length >= 2){
        if(values[0] == values[1]){
            return true; //doubles
        }
        if(values[0] == "9" && values[1] == "6"){
            return true; //69
        }
        if(values[0] == "King" && values[1] == "Queen"){
            return true; //marriage
        }
        if(values[0] == "Queen" && values[1] == "King"){
            return true; //marriage
        }
    }
    if(values.length >= 3){
        if(values[0] == values[2]){
            return true; //sandwich
        }
    }
    return false;
}

class Game extends React.Component{

    constructor(props){
        super(props);
        const suits = ["Spades", "Diamonds", "Club", "Heart"];
        const values = [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
        ];

        // empty array to contain cards
        let deck = [];

        // create a deck of cards
        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = { Value: values[x], Suit: suits[i] };
                deck.push(card);
            }
        }

        // shuffle the cards
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }

        const player1Cards = deck.slice(0,deck.length/2);
        const player2Cards = deck.slice(deck.length/2);

        this.state = {
            player1Cards : player1Cards,
            player2Cards : player2Cards,
            centerCards : [], 
            player1Turn : true,   
        }
    }

    handleSlap(i){
        if(IsSlapGood(this.state.centerCards)){
            if(i == 1){
                const player1Cards = this.state.player1Cards.concat(this.state.centerCards);
                this.setState({
                    player1Cards : player1Cards,
                });
            }else{
                const player2Cards = this.state.player2Cards.concat(this.state.centerCards);
                this.setState({
                    player2Cards : player2Cards,
                });
            }
            this.setState({
                centerCards : [],
            });
        }else{
            if(i == 1){
                let centerCards = [this.state.player1Cards[0]];
                centerCards = centerCards.concat(this.state.centerCards)
                let player1Cards = this.state.player1Cards.slice(1);
                this.setState({
                    centerCards : centerCards,
                    player1Cards : player1Cards,
                })
            }else{
                let centerCards = [this.state.player2Cards[0]];
                centerCards = centerCards.concat(this.state.centerCards)
                let player2Cards = this.state.player2Cards.slice(1);
                this.setState({
                    centerCards : centerCards,
                    player2Cards : player2Cards,
                })
            }
        }
    }

    handlePlayCard(){
        let playerCards;
        let centerCards = this.state.centerCards.slice()
        if(this.state.player1Turn){
            centerCards.push(this.state.player1Cards[0])
            playerCards = this.state.player1Cards.slice(1)
        }else{
            centerCards.push(this.state.player2Cards[0])
            playerCards = this.state.player2Cards.slice(1)
        }

        if(this.state.player1Turn){
            this.setState({
                player1Cards : playerCards,
            })      
        }else{
            this.setState({
                player2Cards : playerCards,
            })
        }
        const player1Turn = !this.state.player1Turn;

        this.setState({           
            centerCards : centerCards,
            player1Turn : player1Turn,
        });
    }

    render(){
        return(
            <div>
                <Player 
                    NumCards={this.state.player1Cards.length} 
                    onSlap={() => this.handleSlap(1)}
                    onPlayCard={() => this.handlePlayCard()}
                    myTurn = {this.state.player1Turn}/>
                <CardPile Cards={this.state.centerCards}/>
                <Player 
                    NumCards={this.state.player2Cards.length}
                    onSlap={() => this.handleSlap(2)}
                    onPlayCard={() => this.handlePlayCard()} 
                    myTurn = {!this.state.player1Turn}/>
            </div>

        );
    }

}



ReactDOM.render(
    <Game />,
    document.getElementById('root')
    );
    
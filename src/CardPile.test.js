import React from 'react'

import { render, getByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import CardPile from './CardPile'

test('My first test', () =>{
    const cards = [{
        Value : 4,
        Suit : "diamonds" 
    }]
    const {container, getByText }= render(<CardPile Cards={cards}/>)
    expect(getByText("4 diamonds")).toBeInTheDocument();
})
import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    let card;
    let playerNewCards=[];
    let dealerNewCards=[];
    let newImagesArray=[];
    let onBoardCardsArray=[];
    let playerScoreValue = 0;
    let dealerScoreValue = 0;
    const [cards, setCards] = useState([])
    const [cardsCount, setCardsCount] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [result, setResult] = useState('Continue');
    const [onBoardCards, setOnBoardCards] = useState([]);
    const [playerCardImages, setPlayerCardImages] = useState([]);
    const [dealerCardImages, setDealerCardImages] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);

    useEffect(() => {
        let path = window.location.pathname;
        if(path !== "/"){
            window.location.href = "/";
        }
        const cardsList = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const cardsObject = { 11 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0, 8 : 0, 9 : 2, 10 : 0};
        setCards(cardsList);
        setCardsCount(cardsObject);
        setOnBoardCards([]);
    
      }, []);

    useEffect(() => {
        if(result !== "Continue"){
            const cardsList = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const cardsObject = { 11 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0, 8 : 0, 9 : 2, 10 : 0};
            dealerScoreValue = 0;
            dealerCards.forEach(card => dealerScoreValue+=card)
            setDealerScore(dealerScoreValue);
            setCards(cardsList);
            setCardsCount(cardsObject);
            setOnBoardCards([]);
            setPlayerCards([]);
            setDealerCards([]);
        }
      }, [result]);

    const cardImage = (card, onBoardCardsArray) => {
        const category = {0:[0], 1:['s1', 'c1', 'h1', 'd1'], 2:['s2', 'c2', 'h2', 'd2'], 
        3:['s3', 'c3', 'h3', 'd3'], 4:['s4', 'c4', 'h4', 'd4'], 
        5:['s5', 'c5', 'h5', 'd5'], 6:['s6', 'c6', 'h6', 'd6'], 
        7:['s7', 'c7', 'h7', 'd7'], 8:['s8', 'c8', 'h8', 'd8'], 
        9:['s9', 'c9', 'h9', 'd9'], 
        10:['s10', 'c10', 'h10', 'd10', 'sj', 'cj', 'hj', 'dj', 'sq', 'cq', 'hq', 'dq', 'sk', 'ck', 'hk', 'dk']}
        let cardCategory;
        if(card === 0){
            cardCategory = 0;
        }else{
            if(card === 11){
            card = 1;
            }
            cardCategory = category[card][Math.floor(Math.random()*category[card].length)];
            while(onBoardCardsArray.includes(cardCategory)){
                cardCategory = category[card][Math.floor(Math.random()*category[card].length)];
            };
            onBoardCardsArray.push(cardCategory);
        };
        let cardImage = "img/" + cardCategory +".png";
        return cardImage;
    };

    const getCard = () =>{ 
        let available = false;
            
        while (!available){
            if (cards.length){
                card = cards[Math.floor(Math.random()*cards.length)];
                card in cardsCount ? cardsCount[card] += 1 : cardsCount[card] = 1;
                let countValue = cardsCount[card];
                let indexValue = cards.indexOf(card);
                if(card === 10){
                    if(countValue <= 16){
                        available = true ;
                    }else{
                        available = false;
                        cards.splice(indexValue, 1);
                    };
                }else{
                    if(countValue <= 4){
                        available = true ;
                    }else{
                        available = false;
                        cards.splice(indexValue, 1);
                    };
                };
            }else{
                return null;
            };
        };    
        return card;
    };

    const playerCheck = () =>{

        playerScoreValue = 0;
        dealerScoreValue = 0;

        playerNewCards.forEach(card => playerScoreValue+=card);

        while(playerNewCards.includes(11) && playerScoreValue > 21){

            let index = playerNewCards.indexOf(11);
            playerNewCards.splice(index, 1, 1);
            playerScoreValue = playerScoreValue - 10;
        }

        if(dealerCards.length){
            dealerCards.forEach(card => dealerScoreValue+=card);
            dealerScoreValue = dealerScoreValue - dealerCards[dealerCards.length - 1];
        }else{
            dealerNewCards.forEach(card => dealerScoreValue+=card);
            dealerScoreValue = dealerScoreValue - dealerNewCards[dealerNewCards.length - 1];
        }


        if(playerScoreValue === 21 && dealerScoreValue === 21){
            setResult("Both have BlackJack! Draw!");
        }else if(playerScoreValue === 21){
            setResult("You have BlackJack! You Win!");
        }else if(playerScoreValue > 21){
            setResult("BUST! You Lose!");
        }else{
            setResult("Continue");
        }
        setPlayerScore(playerScoreValue);
        setDealerScore(dealerScoreValue);
        return null;
    };

    const dealerCheck = () =>{
    
        playerScoreValue = 0;
        dealerScoreValue = 0;
    
        playerCards.forEach(card => playerScoreValue+=card);
        dealerNewCards = [...dealerCards];
        dealerNewCards.forEach(card => dealerScoreValue+=card);
        onBoardCardsArray = [...onBoardCards];
    
        while(dealerScoreValue < 17){
          card = getCard();
          let imageValue = cardImage(card, onBoardCardsArray);
          let newImagesArray = [...dealerCardImages, imageValue];
          setDealerCardImages(newImagesArray);
          dealerNewCards = [...dealerNewCards, card];
          dealerScoreValue += card;
        }
        setOnBoardCards(onBoardCardsArray);
        setDealerCards(dealerNewCards);
        if(dealerScoreValue > 21){
          setResult("Dealer Got BUST! You Win!");
        }else if(playerScoreValue > dealerScoreValue){
          setResult("You have High Value! You Win!")
        }else if(dealerScoreValue === playerScoreValue){
          setResult("Both have same value! Draw!");
        }else if(dealerScoreValue === 21){
          setResult("Dealer has BlackJack! You Lose!");
        }else{
          setResult("Dealer has High Value! You Lose!");
        }
        setOnBoardCards([]);
        setPlayerScore(playerScoreValue);
        setDealerScore(dealerScoreValue);
        return null;
    };

    const handleHit = () =>{
        card = getCard();
        if(card){
          onBoardCardsArray = [...onBoardCards];
          let imageValue = cardImage(card, onBoardCardsArray);
          let newImagesArray = [...playerCardImages, imageValue];
          setOnBoardCards(onBoardCardsArray);
          setPlayerCardImages(newImagesArray);
          playerNewCards = [...playerCards, card]
          setPlayerCards(playerNewCards);
          playerCheck();
        };
    };

    const handleStand = () =>{
        dealerCheck();
    };

    const initial = () =>{

        for(let i=0; i<2; i++){
          playerNewCards.push(getCard());
        };
        onBoardCardsArray = [...onBoardCards];
        newImagesArray = [];
        playerNewCards.map(card =>{
          let imageValue = cardImage(card, onBoardCardsArray);
          newImagesArray.push(imageValue);
          return null;
        });
        setPlayerCards(playerNewCards);
        setPlayerCardImages(newImagesArray);
        
        for(let j=0; j<2; j++){
          dealerNewCards.push(getCard());
        };
        newImagesArray = [];
        dealerNewCards.map(card =>{
          let imageValue = cardImage(card, onBoardCardsArray);
          newImagesArray.push(imageValue);
          return null;
        });
        setDealerCards(dealerNewCards);
        setDealerCardImages(newImagesArray);
        setOnBoardCards(onBoardCardsArray);   
        setResult("Continue");
        playerCheck();

        return null;
    };


    
    return (
        <DataContext.Provider value={{
            handleHit, handleStand, initial, result, playerScore, dealerScore, playerCardImages, dealerCardImages
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;
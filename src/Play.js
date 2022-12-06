import { useContext } from 'react';
import DataContext from './context/DataContext';

const Play = () => {

    const {handleHit, handleStand, initial, result, playerScore, dealerScore,  playerCardImages, dealerCardImages} = useContext(DataContext);
    let button1 = "Hit";
    let button2 = "Stand";
    let button1Method = handleHit;
    let button2Method = handleStand;
    let display = "none";
    let modifiedDealerCardImages;
    let cardCover = 'img/0.png';

    const goHome = () =>{
        window.location.reload(false);
    }

    if(result === "Continue"){
        modifiedDealerCardImages = [cardCover, ...dealerCardImages].slice(0,2);
        button1 = "Hit";
        button1Method = handleHit;
        button2 = "Stand";
        button2Method = handleStand;
        display = "none";
    }else{
        modifiedDealerCardImages = [...dealerCardImages];
        button1 = "NewGame";
        button1Method = initial;
        button2 = "Home";
        button2Method = goHome;
        display = "block";
    }

    return (
        <main className="play">

            <div className="dealerSide">
                {modifiedDealerCardImages.map((card) => (
                        <div className="card" key={card}>
                            <img src={card} alt="0" width="100" height="150"/>
                        </div>
                )
                )}
            </div>

            <div className="board dealerScore">{dealerScore}</div>
            <div className="dealer">Dealer</div>

            <div className="playerSide">
                {playerCardImages.map((card) => (
                        <div className="card" key={card}>
                            <img src={card} alt="0" width="100" height="150"/>
                        </div>
                )
                )}
            </div>

            <div className="board playerScore">{playerScore}</div>
            <div className="player">Player</div>

            <button 
                type="submit"
                onClick={button1Method}
                className="button1"
            >{button1}</button>
            <button 
                type="submit"
                onClick={button2Method}
                className="button2"
            >{button2}</button>

            <div className="result" style={{display:display}}>{result}</div>

        </main>
    );
};

export default Play;
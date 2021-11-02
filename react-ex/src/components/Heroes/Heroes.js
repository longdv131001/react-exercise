import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Heroes.css';

const Heroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [selectedHero, setSelectedHero] = useState({ id: '', name: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [historySelect, setHistorySelect] = useState([]);

    const historyHandleOnClick = (event) => {
        setHistorySelect([]);
    };
    const onClickHandler =(event, value) => {
        setSelectedHero(value);
        historySelect.push(value);
        setHistorySelect(historySelect);


    }
    const onChangeHandler = (value,index) => {
        setSelectedHero({
             id: index,
             name: value
            
        })
        heroes.find(hero => hero.id === index).name = value;
    }
   
    useEffect(() => {
        let didCancel = false;
        setIsLoading(true);
        axios({
            method: 'GET',
            url: 'https://60dff0ba6b689e001788c858.mockapi.io/heroes'
        }).then(response => {
            if (!didCancel) {
                setIsLoading(false);
                setHeroes(response.data);
            }

        }).catch(error => {
            if (!didCancel) {
                setIsLoading(false);
                setErrorMessage(error.message);
            }

        })
        return () => {
            didCancel = true;
        }

    }, []);
    if(onChangeHandler === true) { return heroes.name === selectedHero.name}
    if (isLoading === true) { return 'Loading' }
    if (errorMessage) { return <div>{errorMessage}</div> }

    return (
        <div>
            {heroes.map((value, index) => (
                <div>
                    <ul class="heroes" >
                        <li 
                            onClick={(event) => onClickHandler(event, value ,index)} key={index}
                            style={{backgroundColor:selectedHero.id === value.id ? 'black' : 'gray'}}
                        >
                            <span class="badge" >{value.id}</span> <span >{value.name}</span>
                        </li>
                    </ul>
                </div>
            ))}
            <form autoComplete="off">
                <h2>{selectedHero.name.toUpperCase()} Details</h2>
                <div><span>id: </span>{selectedHero.id}</div>
                <div>
                    <label for="hero-name">Hero name: </label>
                    <input class="input" id="hero-name" name="name" placeholder="name" value={selectedHero.name} onChange={evt => onChangeHandler(evt.target.value,selectedHero.id)}/>
                </div>
            </form>
            <div>
                <h2 style={{color: '#A80000'}}>Messages</h2>
                <button class="clear" onClick={historyHandleOnClick} >Clear messages</button>
                {historySelect.map((item, index) => (<div><span key={index}>HeroesComponent: Selected hero id={item.id}</span> </div>))}
            </div>



        </div >

    )
};
export default Heroes;
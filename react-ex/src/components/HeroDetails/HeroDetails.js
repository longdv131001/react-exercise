import React from "react";

const HeroDetails = ({selectedHero,setSelectedHero,heroes}) => {
    
    
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setSelectedHero({
            ...selectedHero,
            [name]: value,
        });
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
        <div>
                {heroes.find(hero => (
                     <form  autoComplete="off">
                     <h2>{heroes.name} Details</h2>
                     <div><span>id: </span>{hero.id}</div>
                     <div>
                         <label for="hero-name">Hero name: </label>
                         <input id="hero-name" placeholder="name"  />
                     </div>
                 </form>
                ))}
               
            
        </div>
    )
};
export default HeroDetails;
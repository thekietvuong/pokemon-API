import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./cards.scss"
import types from "../Types";
import Matte from "../../images/matte.png";

const Cards = ({pokemon, loading, infoPokemon}) => {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const onChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onClickHandler = () => {
        let i = false;
        pokemon.map(item => {
            if(item.name === search.toLowerCase()){
                infoPokemon(item);
                i = true;
            }
        })
        if(!i){
            alert("So weird, we don't know this pokemon :((")
        }
    }

    const onChangeFilterHandler = (e) => {
        setFilter(e.target.value);
    }

    const myFunction = (item) => {
        let result = false;

        item.types.map(innerItem => {
            if((innerItem.type.name === filter)||(filter === "")){
                result = true;
            }
        })
        return result;
    }


    const loadTypeIcon = (type) => {
        let i = 0;
        types.forEach((item, index) => {
            if(item.name === type){
                i = index;
            }
        })
        return types[i].icon;
    }

    const loadBackground = (type) => {
        let i = 0;
        types.forEach((item, index) => {
            if(item.name === type){
                i = index;
            }
        })
        return types[i].background;
    }

    return(
        <div>
            <div className="search">
                <input type="text" placeholder="What pokemon are you looking for ?" onChange={e => onChangeHandler(e)}/>
                <button onClick={onClickHandler}><BiSearch/></button>
            </div>
            <div className="filter" placeholder="Search by type">
                <label htmlFor="typeFilter">Search by type</label>
                <select name="typeFilter" onChange={e => onChangeFilterHandler(e)}>
                    <option value="">None</option>
                    {
                        types.map((item, index) => {
                            return(
                                <option key={index} value={item.name}>{item.name}</option>
                            ); 
                        })
                    }
                </select>
            </div>
            <div className="cards">
                {
                    loading ? <h1>Loading...</h1> :
                    pokemon.filter(myFunction).map((item)=>{
                        return (
                            <div 
                                className="card"
                                key={item.id} 
                                onClick={() => {
                                    infoPokemon(item);
                                }}
                                style={{background: `${loadBackground(item.types[0].type.name)}`}}
                            >
                                <img className="matte" src={Matte}/>
                                <img className="pokemon" src={item.sprites.front_default} alt=""></img>
                                <div className="info-container">
                                    <h3 className="number">#{item.id.toString().padStart(3, "0")}</h3>
                                    <h3 className="name">{item.name}</h3>
                                    <div className="types">
                                        <h3 className="type-title">Type: </h3>
                                        <div className="type-box">
                                            {
                                                item.types.map((item, index) => (
                                                    <div className="type" key={index}>
                                                        <img className="type-icon" src={loadTypeIcon(item.type.name)}/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Cards;
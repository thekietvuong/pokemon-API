import { useEffect } from "react";
import "./pokeinfo.scss";
import types from "../Types";
import Matte from "../../images/matte.png"

import gsap from "gsap";

const Pokeinfo = ({ data }) => {
    const loadIcon = (type) => {
        let i = 0;
        types.forEach((item, index) => {
            if(item.name === type){
                i = index;
            }
        })
        return types[i].icon;
    }

    const loadColor = (type) => {
        let i = 0;
        types.forEach((item, index) => {
            if(item.name === type){
                i = index;
            }
        })
        return types[i].color;
    }

    useEffect(()=>{
        gsap.fromTo(".img-pokemon", {opacity: 0, y: "5rem", scale: ".5"}, {opacity: 1, y: "0rem", scale: "1", duration: .6, delay: .5, ease: "easeOut"});
        gsap.fromTo(".name", {opacity: 0, y: "5rem", scale: ".5"}, {opacity: 1, y: "0rem", scale: "1", duration: .6, delay: .6, ease: "easeOut"});
        gsap.fromTo(".types", {opacity: 0, y: "5rem", scale: ".5"}, {opacity: 1, y: "0rem", scale: "1", duration: .6, delay: .7, ease: "easeOut"});
        gsap.fromTo(".abilities", {opacity: 0, y: "5rem", scale: ".5"}, {opacity: 1, y: "0rem", scale: "1", duration: .6, delay: .8, ease: "easeOut"});
        gsap.fromTo(".base-stat", {opacity: 0, y: "5rem"}, {opacity: 1, y: "0rem", duration: .6, delay: .9, ease: "easeOut"});
        gsap.fromTo(".number", {opacity: 0, x: "-5rem"}, {opacity: 1, x: "0rem", duration: .6, delay: 1.1, ease: "easeOut"});
    },[data])

    return(
        <div className="Pokeinfo">
            {
                (!data)?"choose a pokemon": (
                    <div className="info">
                        <div className="pokemon">
                            <img src={Matte} className="matte"/>
                            <img className="img-pokemon" src={data.sprites.other.dream_world.front_default} alt="null"/>
                        </div>
                        <div className="pokemon-info">
                            <h1 className="id">#{data.id.toString().padStart(3, "0")}</h1>  
                            <h1 className="name">{data.name}</h1>            
                            <div className="detail">
                                <div className="types">
                                    {
                                        data.types.map((item, index) => (
                                            <div key={index} className="type">
                                                <img src={`${loadIcon(item.type.name)}`}/>
                                                <h2>{item.type.name}</h2>
                                            </div>
                                            ))
                                    }
                                </div>
                                <div className="abilities">
                                    <h3>Abilities: </h3>
                                    <div className="tags">
                                        {
                                            data.abilities.map((poke, index)=>(
                                                <div className="tag" key={index}>
                                                    <h3>{poke.ability.name}</h3>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            
                                <div className="base-stat">
                                    {
                                        data.stats.map((poke, index)=>(
                                            <div key={index}>
                                                <h3>{poke.stat.name}: {poke.base_stat}</h3>
                                                <div className="bar">
                                                    <div className="number"
                                                        style={{
                                                            width: `${poke.base_stat > 200 ? 100 : poke.base_stat/2}%`,
                                                            background: `${loadColor(data.types[0].type.name)}`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div> 
    );
}

export default Pokeinfo;
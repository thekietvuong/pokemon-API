import { useEffect, useState } from "react";
import './main.scss';

import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import Pokeinfo from "../Pokeinfo/Pokeinfo";
import Types from "../Types";

import {IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/io";

const Main=()=>{

    const url = "https://pokeapi.co/api/v2/pokemon?limit=649";

    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async() => {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
      
        function getPokemon(data){
            data.forEach(async(item)=>{
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`);
                const data = await res.json();
                setPokeData(curList => {
                    curList = [...curList, data];
                    curList.sort((a,b)=>a.id>b.id?1:-1)
                    return curList;
                });

            })
        }

        getPokemon(data.results);
        setLoading(false);
    }

    useEffect(()=>{
        pokeFun();
    },[url])

    const loadBackground = (type) => {
        let i = 0;
        Types.forEach((item, index) => {
            if(item.name === type){
                i = index;
            }
        })
        return Types[i].background;
    }

    return(
       <div className="main">
           <Header/>
           <div className="content">
               <div className="cards-content">
                    <Cards pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
               </div>
               {pokeDex && 
                    <div className="pokeinfo-content"
                        style={{background: `${loadBackground(pokeDex.types[0].type.name)}`}}
                    >
                            <button className="close" onClick={()=>setPokeDex("")}>X</button>
                            <button className="next" onClick={()=>setPokeDex(pokeData[pokeDex.id])}><IoMdArrowDropright className="icon"/></button>
                            <button className="previous" onClick={()=>setPokeDex(pokeData[pokeDex.id-2])}><IoMdArrowDropleft className="icon"/></button>
                            <Pokeinfo data={pokeDex}/>
                    </div>
               }
           </div>
       </div>
    );
}

export default Main;
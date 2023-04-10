import "./header.scss";
import pokeball from "../../images/pokeball-bw.png"

const Header = () => {
    return(
        <div className="header">
            <div className="logo">
                <img src={pokeball}/>
                <h1>PokéDex</h1>
            </div>
            <h1 className="by-me">by The Kiet Vuong</h1>
        </div>
    );
}

export default Header;
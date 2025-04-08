import "./game/styles.css"
import Actions from "./game/buttons/Actions";
import Pad from "./game/buttons/Pad";
import StartSelect from "./game/buttons/StartSelect";
import Screen from "./game/Screen";
import { useState, useEffect } from "react";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const BASE_URL = "https://pokeapi.co/api/v2";

  const getPokemones = async () => {
    const res = await fetch(`${BASE_URL}/pokemon?limit=10`);
    const data = await res.json();
    const pokemonsDetails = await getDetails(data.results);
    setPokemones(pokemonsDetails);
  };

  const getDetails = async (results) => {
    const res = await Promise.all(results.map((result) => fetch(result.url)));
    const data = await Promise.all(res.map((el) => el.json()));
    return data; 
  };

  const handlePress = (dir) => {
    console.log(dir);
  }

  useEffect(() => {
    getPokemones();
  }, []);

  return (
    <div className="app-container">
      <div className="game-container">
        <Screen pokemones={pokemones} />
        <div className="buttons-container">
          <Pad handlePress={handlePress} />
          <StartSelect />
          <Actions />
        </div>
      </div>
    </div>
  );
}

export default App;

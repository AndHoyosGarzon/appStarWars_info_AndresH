import style from "./style.module.css";
import { getInfoPlanets } from "../../js/apiFetch.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import CardContext from "../../context/CardContext.jsx";

function CardPlanet({ uid, icon }) {
  const [planet, setPlanet] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(false)
  const navigate = useNavigate();

  //contexto
  const {cardActions} = useContext(CardContext)

  function handleFavorites(){
    console.log(planet.properties.name)
    cardActions({type:'add', payload: planet.properties.name})
    setFavorites(!favorites)
  }

  //useEffect from people
  useEffect(() => {
    async function fetchDataPlanets() {
      try {
        const result = await getInfoPlanets(uid);
        if (result.error) {
          setError("tiene errores al cargar datos");
        } else {
          setPlanet({
            properties: result.properties,
          });
        }
      } catch (error) {
        console.error("Error al traer la data: ", error);
        setError(
          "Ocurrio un error al cargar datos, por favor intente nuevamente"
        );
      }
    }
    fetchDataPlanets();
  }, [uid]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!planet.properties) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.contentCardPeople}>
      <div className="text-center fw-bolder">
        {planet.properties.name} <span className="me-2">{icon}</span>
      </div>
      <div>
        <p>Climate: {planet.properties.climate}</p>
        <p>diameter: {planet.properties.diameter}</p>
        <p>Terrain: {planet.properties.terrain}</p>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate(`/description/planet/${uid}`)}
          className="btn btn-primary text-white border-black  fw-bolder"
        >
          Learn More!
        </button>
        <button onClick={handleFavorites}  className={favorites ? style.bgBtn :style.btn}>
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
}

export default CardPlanet;

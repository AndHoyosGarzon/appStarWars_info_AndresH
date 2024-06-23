import style from "./style.module.css";
import { FaRegHeart } from "react-icons/fa";
import { getInfoPeople } from "../../js/apiFetch.js";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardContext from "../../context/CardContext.jsx";

function CardPeople({ uid, icon }) {
  const [people, setPeople] = useState([]);
  const [favorites, setFavorites] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //contexto
  const {cardActions} = useContext(CardContext)

  function handleFavorites(){
    console.log(people.properties.name)
    cardActions({type:'add', payload: people.properties.name})
    setFavorites(!favorites)
  }

  //useEffect from people
  useEffect(() => {
    async function fetchDataPeople() {
      try {
        const result = await getInfoPeople(uid);
        if (result.error) {
          setError("tiene errores al cargar datos");
        } else {
          setPeople({
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
    fetchDataPeople();
  }, [uid]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!people.properties) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.contentCardPeople}>
      <div className="text-center fw-bolder">
        {people.properties.name} <span className="me-2">{icon}</span>
      </div>
      <div>
        <p>Eye_color: {people.properties.eye_color}</p>
        <p>Hair_color: {people.properties.hair_color}</p>
        <p>Gender: {people.properties.gender}</p>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate(`/description/${uid}`)}
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

export default CardPeople;

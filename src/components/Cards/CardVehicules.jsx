import style from "./style.module.css";
import { getInfoVehicles } from "../../js/apiFetch.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import CardContext from "../../context/CardContext.jsx";

function CardVehicle({ uid, icon }) {
  const [vehicle, setVehicle] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(false);
  const navigate = useNavigate();

  const { cardActions } = useContext(CardContext);

  function handleFavorites() {
    cardActions({ type: "add", payload: vehicle.properties.name });
    setFavorites(!favorites);
  }

  //useEffect from people
  useEffect(() => {
    async function fetchDataVehicles() {
      try {
        const result = await getInfoVehicles(uid);
        if (result.error) {
          setError("tiene errores al cargar datos");
        } else {
          setVehicle({
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
    fetchDataVehicles();
  }, [uid]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicle.properties) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.contentCardPeople}>
      <div className="text-center fw-bolder">
        {vehicle.properties.name} <span className="me-2">{icon}</span>
      </div>
      <div>
        <p>Model: {vehicle.properties.model}</p>
        <p>vehicle_class: {vehicle.properties.vehicle_class}</p>
        <p>Passengers: {vehicle.properties.passengers}</p>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate(`/description/vehicle/${uid}`)}
          className="btn btn-primary text-white border-black  fw-bolder"
        >
          Learn More!
        </button>
        <button
          onClick={handleFavorites}
          className={favorites ? style.bgBtn : style.btn}
        >
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
}

export default CardVehicle;

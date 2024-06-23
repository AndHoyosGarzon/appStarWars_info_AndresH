import { useEffect, useState } from "react";
import { IoIosPlanet } from "react-icons/io";
import { getPeople } from "../../js/apiFetch";
import style from "./style.module.css";
import CardPlanet from "../Cards/CardPlanet";

function Planet() {
  const [planets, setPlanets] = useState([]);
  //estado que almacena errores
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getPeople("https://www.swapi.tech/api/planets");
        if (result.error) {
          setError(result.error.message);
        } else {
          setPlanets(result);
        }
      } catch (error) {
        console.log("Error al traer la data: ", error);
        setError(
          "Ocurrio un error al cargar datos por favor intente nuevamente"
        );
      }
    }
    fetchData();
  }, []);

  //retorna los errores si es que los hay...
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container  mt-5">
      <div className="text-center d-flex justify-content-between mb-5 border-bottom">
        <p className="h1 fw-bolder text-start ms-3 text-secondary">PLANETS</p>
        <p className="h1 me-3 text-end text-dark"> <IoIosPlanet /></p>
      </div>
      <div className={style.contentPeople}>
        {planets.length > 0 ? (
          planets.map((el) => {
            return (
              <CardPlanet
                key={el.uid}
                uid={el.uid}
                icon={<IoIosPlanet color="red" />}
              />
            );
          })
        ) : (
          <div className="h3 text-secondary">LOADING...</div>
        )}
      </div>
    </div>
  );
}

export default Planet;

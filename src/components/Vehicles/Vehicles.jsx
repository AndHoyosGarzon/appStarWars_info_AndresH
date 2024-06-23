import { useEffect, useState } from "react";
import CardVehicle from "../Cards/CardVehicules";
import { GiInterceptorShip } from "react-icons/gi";
import { getPeople } from "../../js/apiFetch";
import style from "./style.module.css";

function Vehicles() {
  const [vehicles, setVehicules] = useState([]);
  //estado que almacena errores
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getPeople("https://www.swapi.tech/api/vehicles");
        if (result.error) {
          setError(result.error.message);
        } else {
          setVehicules(result);
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
        <p className="h1 fw-bolder ms-3 text-secondary text-start ">VEHICLES</p>
        <p className="h1 me-3 text-end text-dark"><GiInterceptorShip /></p>
      </div>
      <div className={style.contentPeople}>
        {vehicles.length > 0 ? (
          vehicles.map((el) => {
            return (
              <CardVehicle
                key={el.uid}
                uid={el.uid}
                icon={<GiInterceptorShip color="red" />}
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

export default Vehicles;

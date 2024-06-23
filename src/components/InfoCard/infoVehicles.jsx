import { GiInterceptorShip } from "react-icons/gi";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { getInfoVehicles } from "../../js/apiFetch";
import { useParams } from "react-router-dom";

function InfoVehicles() {
  const { id } = useParams();
  const [infoVehicle, setInfoVehicle] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getInfoVehicles(id);
        if (result.error) {
          setError("Tiene errores al cargar datos");
        } else {
          setInfoVehicle({
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
    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!infoVehicle.properties) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.contentInfoCard}>
      <div className={style.infoCardTop}>
        <div className={style.infoCardImg}>
          <p>
            <GiInterceptorShip />
          </p>
        </div>
        <p className={style.infoCardDescription}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
          distinctio mollitia ad temporibus itaque dolore nobis facere, beatae
          iste porro voluptate ut animi asperiores blanditiis maxime dolores
          maiores voluptatum neque.
        </p>
      </div>
      <div className={style.infoCardBottom}>
        <div>
          <p>Name Vehicle</p>
          <span>{infoVehicle.properties.name}</span>
        </div>
        <div>
          <p>Model</p>
          <span>{infoVehicle.properties.model}</span>
        </div>
        <div>
          <p>Passengers</p>
          <span>{infoVehicle.properties.passengers}</span>
        </div>
        <div>
          <p>Vehicle class</p>
          <span>{infoVehicle.properties.vehicle_class}</span>
        </div>
        <div>
          <p>Cargo Capacity</p>
          <span>{infoVehicle.properties.cargo_capacity}</span>
        </div>
      </div>
    </div>
  );
}

export default InfoVehicles;

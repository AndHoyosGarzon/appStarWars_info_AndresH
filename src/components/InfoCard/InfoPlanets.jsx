import style from "./style.module.css";
import { useEffect, useState } from "react";
import { getInfoPlanets } from "../../js/apiFetch";
import { useParams } from "react-router-dom";
import { IoIosPlanet } from "react-icons/io";

function InfoPlanets() {
  const { id } = useParams();
  const [infoPlanet, setInfoPlanet] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getInfoPlanets(id);
        if (result.error) {
          setError("Tiene errores al cargar datos");
        } else {
          setInfoPlanet({
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

  if (!infoPlanet.properties) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.contentInfoCard}>
      <div className={style.infoCardTop}>
        <div className={style.infoCardImg}>
          <p>
            <IoIosPlanet />
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
          <p>Name Planet</p>
          <span>{infoPlanet.properties.name}</span>
        </div>
        <div>
          <p>Diameter</p>
          <span>{infoPlanet.properties.diameter}</span>
        </div>
        <div>
          <p>Gravity</p>
          <span>{infoPlanet.properties.gravity}</span>
        </div>
        <div>
          <p>Climate</p>
          <span>{infoPlanet.properties.climate}</span>
        </div>
        <div>
          <p>Terrain</p>
          <span>{infoPlanet.properties.terrain}</span>
        </div>
      </div>
    </div>
  );
}

export default InfoPlanets;

import { FaUserSecret } from "react-icons/fa";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { getInfoPeople } from "../../js/apiFetch";
import { useParams } from "react-router-dom";

function InfoCard() {
  const { id } = useParams();
  const [infoPeople, setInfopeople] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getInfoPeople(id);
        if (result.error) {
          setError("Tiene errores al cargar datos");
        } else {
          setInfopeople({
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

  if (!infoPeople.properties) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.contentInfoCard}>
      <div className={style.infoCardTop}>
        <div className={style.infoCardImg}>
          <p>
            <FaUserSecret />
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
          <p>Name</p>
          <span>{infoPeople.properties.name}</span>
        </div>
        <div>
          <p>Birth Year</p>
          <span>{infoPeople.properties.birth_year}</span>
        </div>
        <div>
          <p>Gender</p>
          <span>{infoPeople.properties.gender}</span>
        </div>
        <div>
          <p>Height</p>
          <span>{infoPeople.properties.height}</span>
        </div>
        <div>
          <p>Skin color</p>
          <span>{infoPeople.properties.skin_color}</span>
        </div>
        <div>
          <p>Eye color</p>
          <span>{infoPeople.properties.eye_color}</span>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;

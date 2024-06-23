import style from "./style.module.css";
import { useState } from "react";
import { getPeople } from "../../js/apiFetch";
import { useEffect } from "react";
import CardPeople from "../Cards/CardPeople";
import { FaUserSecret } from "react-icons/fa6";

function People() {
  const [people, setPeople] = useState([]);
  //estado que almacena errores
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getPeople("https://www.swapi.tech/api/people/");
        if (result.error) {
          setError(result.error.message);
        } else {
          setPeople(result);
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
        <p className="h1 fw-bolder text-start ms-3 text-secondary ">PEOPLE</p>
        <p className="text-end h1 me-3 text-dark"><FaUserSecret /></p>
      </div>
      <div className={style.contentPeople}>
        {people.length > 0 ? (
          people.map((el) => {
            return (
              <CardPeople
                key={el.uid}
                uid={el.uid}
                icon={<FaUserSecret color="red" />}
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

export default People;

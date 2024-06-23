import { Link } from "react-router-dom";
import People from "../components/People/People";
import Planet from "../components/Planets/Planets";
import Vehicles from "../components/Vehicles/Vehicles";
import CardContext from "../context/CardContext";
import { useContext } from "react";
import { IoTrashBin } from "react-icons/io5";

function NavBar() {
  const { card, cardActions } = useContext(CardContext);

  return (
    <div>
      <nav className="navbar bg-light p-3">
        <div className="container-fluid d-flex justify-content-between">
          <p className="h3 fw-bold ms-5">
            <Link to={"/"} className="nav-link">
              <img
                style={{ width: "60px" }}
                src="../../public/icons8-la-guerra-de-las-galaxias-100.png"
                alt=""
              />
            </Link>
          </p>
          <div>
            <div className="dropdown me-5">
              <button
                className="btn btn-warning border-black fw-bolder"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites <span className="me-2">{card.length}</span>
              </button>
              <ul className="dropdown-menu">
                {card &&
                  card.map((name, idx) => {
                    return (
                      <li key={idx} className="d-flex px-3">
                        <a className="dropdown-item" href="#">
                          {name}
                        </a>
                        <span className="mt-1" onClick={() => cardActions({type:'remove'})}><IoTrashBin color="darkred" /></span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <People />
      <Vehicles />
      <Planet />
    </div>
  );
}

export default NavBar;

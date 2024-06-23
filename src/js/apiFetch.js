//get peoples
export async function getPeople(url) {
  try {
    const response = await fetch(url, {
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error: ", error.message);
    return { Error: { message: error.message } };
  }
}

//get info people
export async function getInfoPeople(uid) {
  const url = `https://www.swapi.tech/api/people/${uid}`;
  try {
    const response = await fetch(url, {
      headers: { "Content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.result;
  } catch (error) {
    console.log("Error al obtener personaje: ", error.message);
    return { Error: { message: error.message } };
  }
}

// get info vehicules
export async function getInfoVehicles(uid) {
  const url = `https://www.swapi.tech/api/vehicles/${uid}`;
  try {
    const response = await fetch(url, {
      headers: { "Content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.result;
  } catch (error) {
    console.log("Error al obtener personaje: ", error.message);
    return { Error: { message: error.message } };
  }
}

//get info planets
export async function getInfoPlanets(uid) {
  const url = `https://www.swapi.tech/api/planets/${uid}`;
  try {
    const response = await fetch(url, {
      headers: { "Content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.result;
  } catch (error) {
    console.log("Error al obtener personaje: ", error.message);
    return { Error: { message: error.message } };
  }
}
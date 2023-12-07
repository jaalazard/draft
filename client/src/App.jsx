import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./main.css";
import { useAuth } from "../../server/contexts/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  const [cocktails, setCocktails] = useState([]);
  const [thisCocktail, setThisCocktail] = useState(null);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const res = await fetch("http://localhost:5000/check", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  const getAllCocktails = async () => {
    try {
      const response = await fetch("/api/cocktails");
      if (response.ok) {
        const cocktails = await response.json();
        setCocktails(cocktails);
      } else {
        console.error(
          `Erreur de récupération des cocktails: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des cocktails:", error);
    }
  };

  const getThisCocktail = async (id) => {
    try {
      const response = await fetch(`/api/cocktails/${id}`);
      console.log(response);
      if (response.ok) {
        const thisCocktail = await response.json();
        console.log(thisCocktail);
        setThisCocktail(thisCocktail);
      } else {
        console.error(
          `Erreur de récupération des cocktails: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des cocktails:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl underline bg-dark">Coucou le front</h1>
      <button onClick={getAllCocktails}>
        Cliquez ici pour récupérer les cocktails
      </button>
      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.id}>
            <button onClick={() => getThisCocktail(cocktail.id)}>
              {cocktail.name}
            </button>
          </li>
        ))}
      </ul>

      {thisCocktail && (
        <div>
          <h2 className="text-3xl bg-red-500">{thisCocktail.name}</h2>
          <p>kcal :{thisCocktail.total_kcal}</p>
          <p>degree :{thisCocktail.total_degree}</p>
          <p>flavour :{thisCocktail.final_flavour}</p>

          {/* Affichez d'autres détails du cocktail ici */}
        </div>
      )}
    </>
  );
}

export default App;

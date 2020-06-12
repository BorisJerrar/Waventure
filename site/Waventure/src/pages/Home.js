import React from "react";
import { Link } from 'react-router-dom';

function Home(props) {
  return (
      <div>
          <button>
              <Link to="/signUp">
                  S'inscrire
              </Link>
          </button>
          <button>
              <Link to="/signIn">
                S'identifier
              </Link>
          </button>
      </div>
  );
}

export default Home;
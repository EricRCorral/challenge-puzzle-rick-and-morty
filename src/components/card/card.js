import React, { useEffect } from "react";
import M from "materialize-css";

function Card(props) {
  const arr5 =
    props.filter !== "characters"
      ? props.filter === "locations"
        ? props.residents.slice(0, 5)
        : props.characters.slice(0, 5)
      : undefined;

  useEffect(() => {
    let elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  }, []);

  return (
    <>
      <div id={props.id} className="modal">
        <div className="modal-content">
          <i className="material-icons modal-close">close</i>

          {props.filter === "characters" ? (
            <>
              <div className="center-align">
                <img
                  className="responsive-img"
                  src={props.image}
                  alt={props.name}
                />

                <h4>{props.name.toUpperCase()}</h4>
              </div>

              <h5>Gender: {props.gender}</h5>

              <h5>Specie: {props.species}</h5>

              {props.type !== "" && <h5>Type: {props.type}</h5>}
            </>
          ) : (
            <>
              <h4 className="center-align">{props.name.toUpperCase()}</h4>

              {props.dimension && <h5>Dimension: {props.dimension}</h5>}

              {props.type && <h5>Type: {props.type}</h5>}

              {props.episode && <h5>Episode code: {props.episode}</h5>}

              {props.air_date && <h5>Air date: {props.air_date}</h5>}

              {props.filter === "locations" ? (
                <h5>Residents:</h5>
              ) : (
                <h5>Characters:</h5>
              )}

              <div className="row">
                {arr5.map((data) => (
                  <div className="col s12 m3" key={data.id}>
                    <div className="card">
                      {data.image !== null && (
                        <>
                          <div className="card-image">
                            <img src={data.image} alt={data.name} />
                          </div>

                          <div className="card-content truncate">
                            {data.name}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;

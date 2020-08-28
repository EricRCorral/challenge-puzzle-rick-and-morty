import React, { useEffect } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { State } from "../../interfaces/State";
import { Data } from "../../interfaces/Data";

function Card({ filter, data }: Data) {
  let filterSelect = filter === "locations" ? "residents" : "characters";

  useEffect(() => {
    let modal = document.querySelectorAll(".modal");
    M.Modal.init(modal);
  });

  return (
    <>
      {typeof data !== "undefined" && (
        <div id={data.id} className="modal">
          <div className="modal-content">
            <i className="material-icons modal-close">close</i>

            {filter === "characters" ? (
              <>
                <div className="center-align">
                  <img
                    className="responsive-img"
                    src={data.image}
                    alt={data.name}
                  />

                  <h4>{data.name.toUpperCase()}</h4>
                </div>

                <h5>Gender: {data.gender}</h5>

                <h5>Specie: {data.species}</h5>

                {data.type !== "" && <h5>Type: {data.type}</h5>}
              </>
            ) : (
              <>
                <h4 className="center-align">{data.name.toUpperCase()}</h4>

                {data.dimension && <h5>Dimension: {data.dimension}</h5>}

                {data.type && <h5>Type: {data.type}</h5>}

                {data.episode && <h5>Episode code: {data.episode}</h5>}

                {data.air_date && <h5>Air date: {data.air_date}</h5>}

                {data.filter === "locations" ? (
                  <h5>Residents:</h5>
                ) : (
                  <h5>Characters:</h5>
                )}

                <div className="row">
                  {data[filterSelect].slice(0, 5).map((item: any) => (
                    <div className="col s12 m3" key={item.id}>
                      <div className="card">
                        {item.image !== null && (
                          <>
                            <div className="card-image">
                              <img src={item.image} alt={item.name} />
                            </div>

                            <div className="card-content truncate">
                              {item.name}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}{" "}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function mapState(state: State) {
  return {
    data: state.data[state.filter].results[state.currentCard],
    filter: state.filter,
  };
}

export default connect(mapState)(Card);

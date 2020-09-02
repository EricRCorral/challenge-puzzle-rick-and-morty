import React, { useEffect } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { Response } from "../../apollo/types";

interface State {
  data: Response;
  filter: string;
  currentCard?: number;
}

interface RequiredData {
  id: number;
  name: string;
  image: string;
}

const Card = ({ filter, data }: State) => {
  const REQUIRED_DATA = filter === "locations" ? "residents" : "characters";

  useEffect(() => {
    const MODAL = document.querySelectorAll(".modal");
    M.Modal.init(MODAL);
  });

  if (data === undefined) {
    return null;
  }

  const {
    id,
    image,
    name,
    type,
    air_date,
    gender,
    species,
    dimension,
    episode,
  } = data;

  return (
    <>
      <div id={id} className="modal">
        <div className="modal-content">
          <i className="material-icons modal-close">close</i>

          {filter === "characters" ? (
            <>
              <div className="center-align">
                <img className="responsive-img" src={image} alt={name} />

                <h4>{name.toUpperCase()}</h4>
              </div>

              <h5>Gender: {gender}</h5>

              <h5>Specie: {species}</h5>

              {type !== "" && <h5>Type: {type}</h5>}
            </>
          ) : (
            <>
              <h4 className="center-align">{name.toUpperCase()}</h4>

              {dimension && <h5>Dimension: {dimension}</h5>}

              {type && <h5>Type: {type}</h5>}

              {episode && <h5>Episode code: {episode}</h5>}

              {air_date && <h5>Air date: {air_date}</h5>}

              <h5>{filter === "locations" ? "Residents: " : "Characters: "}</h5>

              <div className="row">
                {data[REQUIRED_DATA].slice(0, 5).map(
                  ({ id, image, name }: RequiredData) => (
                    <div className="col s12 m3" key={id}>
                      <div className="card">
                        {!!image && (
                          <>
                            <div className="card-image">
                              <img src={image} alt={name} />
                            </div>

                            <div className="card-content truncate">{name}</div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: State) => {
  return {
    data: state.data[state.filter].results[state.currentCard],
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(Card);

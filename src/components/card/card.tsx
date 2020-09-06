import React, { useEffect } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";

interface State {
  data: CharactersResponse | LocationsResponse | EpisodesResponse;
  filter: string;
  currentCard: number;
}

const Card = ({ filter, data, currentCard }: State) => {
  const DATA =
    filter === "characters"
      ? data.characters?.results[currentCard]
      : filter === "locations"
      ? data.locations?.results[currentCard]
      : data.episodes?.results[currentCard];

  const REQUIRED_DATA =
    filter === "locations" ? DATA?.residents : DATA?.characters;

  const ID = DATA?.id;
  const IMAGE = DATA?.image;
  const NAME = DATA?.name;
  const GENDER = DATA?.gender;
  const SPECIES = DATA?.species;
  const TYPE = DATA?.type;
  const DIMENSION = DATA?.dimension;
  const EPISODE = DATA?.episode;
  const AIR_DATE = DATA?.air_date;

  useEffect(() => {
    const MODAL = document.querySelectorAll(".modal");
    M.Modal.init(MODAL);
  });

  if (data === undefined) {
    return null;
  }

  return (
    <>
      <div id={ID} className="modal">
        <div className="modal-content">
          <i className="material-icons modal-close">close</i>

          {filter === "characters" ? (
            <>
              <div className="center-align">
                <img className="responsive-img" src={IMAGE} alt={NAME} />

                <h4>{NAME?.toUpperCase()}</h4>
              </div>

              <h5>Gender: {GENDER}</h5>

              <h5>Specie: {SPECIES}</h5>

              {TYPE !== "" && <h5>Type: {TYPE}</h5>}
            </>
          ) : (
            <>
              <h4 className="center-align">{NAME?.toUpperCase()}</h4>

              {DIMENSION && <h5>Dimension: {DIMENSION}</h5>}

              {TYPE && <h5>Type: {TYPE}</h5>}

              {EPISODE && <h5>Episode code: {EPISODE}</h5>}

              {AIR_DATE && <h5>Air date: {AIR_DATE}</h5>}

              <h5>{filter === "locations" ? "Residents: " : "Characters: "}</h5>

              <div className="row">
                {REQUIRED_DATA?.slice(0, 5).map(({ id, image, name }) => (
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
                ))}
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
    data: state.data,
    filter: state.filter,
    currentCard: state.currentCard,
  };
};

export default connect(mapStateToProps)(Card);

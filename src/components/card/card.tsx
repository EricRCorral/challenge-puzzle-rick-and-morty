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
  const RESULTS =
    filter === "characters"
      ? data.characters?.results[currentCard]
      : filter === "locations"
      ? data.locations?.results[currentCard]
      : data.episodes?.results[currentCard];

  const REQUIRED_DATA =
    filter === "locations" ? RESULTS?.residents : RESULTS?.characters;

  const ID = RESULTS?.id;
  const IMAGE = RESULTS?.image;
  const NAME = RESULTS?.name;
  const GENDER = RESULTS?.gender;
  const SPECIES = RESULTS?.species;
  const TYPE = RESULTS?.type;
  const DIMENSION = RESULTS?.dimension;
  const EPISODE = RESULTS?.episode;
  const AIR_DATE = RESULTS?.air_date;

  useEffect(() => {
    M.Modal.init(document.querySelectorAll(".modal"));
  });

  if (data === undefined) {
    return null;
  }

  const CardModal = () => {
    if (filter === "characters") {
      return (
        <>
          <div className="center-align">
            <img className="responsive-img" src={IMAGE} alt={NAME} />

            <h4>{NAME?.toUpperCase()}</h4>
          </div>

          <h5>Gender: {GENDER}</h5>

          <h5>Specie: {SPECIES}</h5>

          {TYPE !== "" && <h5>Type: {TYPE}</h5>}
        </>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <>
      <div id={ID} className="modal">
        <div className="modal-content">
          <i className="material-icons modal-close">close</i>
          <CardModal />
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

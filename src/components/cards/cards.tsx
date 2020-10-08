import React from "react";
import { Card, Paginator } from "..";
import { connect } from "react-redux";
import { setCurrentCardAction } from "../../actions/query";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";
import { Error, NoResults, NotSearched, Loader } from "../search-states";

interface State {
  data: CharactersResponse | LocationsResponse | EpisodesResponse;
  searcherValue: string;
  filter: string;
  fetching: boolean;
  error: boolean;
  setCurrentCardAction: { (i: number): any };
}

interface Results {
  id?: string;
  name?: string;
  image?: string;
  dimension?: string;
  episode?: string;
}

const Cards = ({
  data,
  searcherValue,
  filter,
  fetching,
  error,
  setCurrentCardAction,
}: State) => {
  const DATA_FILTERED =
    filter === "characters"
      ? data.characters
      : filter === "locations"
      ? data.locations
      : data.episodes;

  if (searcherValue.length < 3) return <NotSearched />;

  if (fetching) return <Loader />;

  if (error) return <Error />;

  if (DATA_FILTERED === null) return <NoResults />;

  return (
    <>
      <div className="row">
        {DATA_FILTERED?.results.map(
          ({ id, name, image, dimension, episode }: Results, i: number) => (
            <div key={id} className="col s6 l3 hoverable">
              <div className="card">
                <a
                  className="modal-trigger"
                  onMouseOver={() => setCurrentCardAction(i)}
                  href={`#${id}`}
                >
                  {filter === "characters" ? (
                    <>
                      <div className="card-image">
                        <img src={image} alt={name} />
                      </div>

                      <div className="card-content center-align truncate">
                        <strong>{name}</strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="card-height card-content">
                        <div className="card-title center-align">
                          <strong>
                            {filter === "locations"
                              ? "Location: "
                              : "Episode: "}
                            {name}
                          </strong>
                        </div>

                        <div className="card-action center-align">
                          {filter === "locations" && "Dimension: "}
                          {dimension}
                          {filter === "episodes" && "Episode code: "}
                          {episode}
                        </div>
                      </div>
                    </>
                  )}
                </a>
                <Card />
              </div>
            </div>
          )
        )}
      </div>
      <Paginator />
    </>
  );
};

const mapStateToProps = (state: State) => {
  return {
    data: state.data,
    searcherValue: state.searcherValue,
    filter: state.filter,
    fetching: state.fetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  setCurrentCardAction,
})(Cards);

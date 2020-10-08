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
          ({ id, name, image, dimension, episode }: any, i: number) => (
            <div key={id}>
              <div className="col s6 l3 hoverable">
                <div className="card">
                  {filter === "characters" ? (
                    <>
                      <a
                        className="modal-trigger"
                        onMouseOver={() => setCurrentCardAction(i)}
                        href={`#${id}`}
                      >
                        <div className="card-image">
                          <img src={image} alt={name} />
                        </div>

                        <div className="card-content center-align">
                          <div className="truncate">
                            <strong>{name}</strong>
                          </div>
                        </div>
                      </a>

                      <Card />
                    </>
                  ) : (
                    <>
                      <a
                        className="modal-trigger"
                        onMouseOver={() => setCurrentCardAction(i)}
                        href={`#${id}`}
                      >
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
                      </a>

                      <Card />
                    </>
                  )}
                </div>
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

import React from "react";
import Card from "../card/card";
import { connect } from "react-redux";
import { setPageAction } from "../../redux/queryDuck";

function Cards({ data, name, page, filter, fetching, error, setPageAction }) {
  function changePage(page) {
    if (page === null) {
      return;
    } else {
      setPageAction(page);
    }
  }

  if (name.length < 3) {
    return (
      <h4 className="center-align">
        Here will appear what you are searching
        <span role="img" aria-label="Emoji">
          🚀
        </span>
      </h4>
    );
  }

  if (fetching)
    return (
      <div className="center-align">
        <div className="preloader-wrapper active big">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <h3 className="center-align">
        No results{" "}
        <span role="img" aria-label="Emoji">
          ❌
        </span>
      </h3>
    );

  let pages = new Array(data[filter].info.pages)
    .fill(0)
    .map((zero) => (zero += Math.random()));

  return (
    <>
      <div className="row">
        {data[filter].results.map(
          (
            {
              id,
              name,
              image,
              dimension,
              episode,
              type,
              gender,
              species,
              air_date,
              characters,
              residents,
            },
            i
          ) => (
            <div key={id}>
              <div className="col s6 l3 hoverable">
                <div className="card">
                  {filter === "characters" ? (
                    <>
                      <a className="modal-trigger" href={`#${id}`}>
                        <div className="card-image">
                          <img src={image} alt={name} />
                        </div>

                        <div className="card-content center-align">
                          <div className="truncate">
                            <strong>{name}</strong>
                          </div>
                        </div>
                      </a>

                      <Card
                        id={id}
                        filter={filter}
                        name={name}
                        image={image}
                        type={type}
                        gender={gender}
                        species={species}
                      />
                    </>
                  ) : (
                    <>
                      <a className="modal-trigger" href={`#${id}`}>
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

                      <Card
                        id={id}
                        name={name}
                        episode={episode}
                        dimension={dimension}
                        air_date={air_date}
                        type={type}
                        residents={residents}
                        characters={characters}
                        filter={filter}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="row center-align">
        <ul className="pagination">
          <li
            className={page === 1 ? "waves-effect disabled" : "waves-effect"}
            onClick={() => changePage(data[filter].info.prev)}
          >
            <a href="/#">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>

          {pages.map((random, i) => (
            <li
              key={random}
              className={
                i + 1 === page ? "waves-effect active" : "waves-effect"
              }
              onClick={() => changePage(i + 1)}
            >
              <a href="/#">{i + 1}</a>
            </li>
          ))}

          <li
            className={
              pages.length === page ? "waves-effect disabled" : "waves-effect"
            }
            onClick={() => changePage(data[filter].info.next)}
          >
            <a href="/#">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

function mapState(state) {
  return {
    data: state.data,
    name: state.name,
    page: state.page,
    filter: state.filter,
    fetching: state.fetching,
    error: state.error,
  };
}

export default connect(mapState, { setPageAction })(Cards);

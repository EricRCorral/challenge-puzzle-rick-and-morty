import React from "react";
import { connect } from "react-redux";
import { setPageAction } from "../../actions/query";
import { Response as CharactersResponse } from "../../apollo/queries/queryCharacters";
import { Response as LocationsResponse } from "../../apollo/queries/queryLocations";
import { Response as EpisodesResponse } from "../../apollo/queries/queryEpisodes";

interface State {
  data: CharactersResponse | LocationsResponse | EpisodesResponse;
  page: number;
  filter: string;
  setPageAction: any;
}

const Paginator = ({ data, page, filter, setPageAction }: State) => {
  const DATA_FILTERED =
    filter === "characters"
      ? data.characters
      : filter === "locations"
      ? data.locations
      : data.episodes;

  const NEXT = DATA_FILTERED?.info.next;
  const PREV = DATA_FILTERED?.info.prev;
  const PAGES = DATA_FILTERED?.info.pages;

  let pages =
    data !== undefined
      ? new Array(PAGES).fill(0).map((zero) => (zero += Math.random()))
      : [];

  const changePage = (page?: number) => {
    if (page === null) {
      return;
    }
    setPageAction(page);
  };

  return (
    <div className="row center-align">
      <ul className="pagination">
        <li
          className={page === 1 ? "waves-effect disabled" : "waves-effect"}
          onClick={() => changePage(PREV)}
        >
          <a href="/#">
            <i className="material-icons text-whitesmoke">chevron_left</i>
          </a>
        </li>

        {pages.map((random, i) => (
          <li
            key={random}
            className={
              i + 1 === page ? "waves-effect active teal" : "waves-effect"
            }
            onClick={() => changePage(i + 1)}
          >
            <a href="/#">
              <div className="text-whitesmoke">{i + 1}</div>
            </a>
          </li>
        ))}

        <li
          className={
            pages.length === page ? "waves-effect disabled" : "waves-effect"
          }
          onClick={() => changePage(NEXT)}
        >
          <a href="/#">
            <i className="material-icons text-whitesmoke">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  data: state.data,
  page: state.page,
  filter: state.filter,
});

export default connect(mapStateToProps, {
  setPageAction,
})(Paginator);

import React from "react";
import { connect } from "react-redux";
import { setPageAction, setFilterAction } from "../../actions/query";

interface State {
  filter: string,
  fetching: boolean,
  setFilterAction: {(filter: string): any},
  setPageAction: {(page: number, notUndefined: boolean): any}
}

const Filters = ({
  filter,
  fetching,
  setFilterAction,
  setPageAction,
}: State) => {
  const radios = ["Characters", "Locations", "Episodes"];

  const selectFilter = (filterSelected: string) => {
    setPageAction(1, false);
    setFilterAction(filterSelected);
  };

  return (
    <div className="col s12 m2 filters">
      <h4>Filters</h4>

      <form>
        {radios.map((filterName) => (
          <p key={filterName}>
            <label>
              <input
                checked={filterName.toLowerCase() === filter}
                className="with-gap"
                type="radio"
                disabled={fetching}
                onChange={() => selectFilter(filterName.toLowerCase())}
              />

              <span>{filterName}</span>
            </label>
          </p>
        ))}
      </form>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    filter: state.filter,
    fetching: state.fetching,
  };
};

export default connect(mapStateToProps, { setPageAction, setFilterAction })(
  Filters
);

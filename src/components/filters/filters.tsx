import React from "react";
import { connect } from "react-redux";
import { setFilterAction } from "../../actions/query";

interface State {
  filter: string;
  fetching: boolean;
  setFilterAction: { (filter: string): any };
}

const Filters = ({ filter, fetching, setFilterAction }: State) => {
  const FILTERS = ["Characters", "Locations", "Episodes"];

  const selectFilter = (filterSelected: string) => {
    setFilterAction(filterSelected);
  };

  return (
    <div className="col s12 m2 filters">
      <div className="filters-title">Filters</div>

      <form>
        {FILTERS.map((filterName) => (
          <p key={filterName}>
            <label>
              <input
                checked={filterName.toLowerCase() === filter}
                className="with-gap"
                type="radio"
                disabled={fetching}
                onChange={() => selectFilter(filterName.toLowerCase())}
              />

              <span className="text-whitesmoke">{filterName}</span>
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

export default connect(mapStateToProps, { setFilterAction })(Filters);

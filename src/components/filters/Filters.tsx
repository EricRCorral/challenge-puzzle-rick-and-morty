import React from "react";
import { connect } from "react-redux";
import { setFilterAction } from "../../actions/query";

interface State {
  filter: string;
  fetching: boolean;
  setFilterAction: { (filter: string): any };
}

const FILTERS = ["Characters", "Locations", "Episodes"];

const Filters = ({ filter, fetching, setFilterAction }: State) => (
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
              onChange={() => setFilterAction(filterName.toLowerCase())}
            />

            <span className="text-whitesmoke">{filterName}</span>
          </label>
        </p>
      ))}
    </form>
  </div>
);

const mapStateToProps = (state: State) => ({
  filter: state.filter,
  fetching: state.fetching,
});

export default connect(mapStateToProps, { setFilterAction })(Filters);

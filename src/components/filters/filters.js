import React from "react";
import { connect } from "react-redux";
import { setPageAction, setFilterAction } from "../../redux/queryDuck";

function Filters({ filter, fetching, setFilterAction, setPageAction }) {
  const radios = ["Characters", "Locations", "Episodes"];

  function selectFilter(filterSelected) {
    setPageAction(1, false);
    setFilterAction(filterSelected);
  }

  return (
    <>
      <h4>Filters</h4>

      <form>
        {radios.map((name) => (
          <p key={name}>
            <label>
              <input
                checked={name.toLowerCase() === filter}
                className="with-gap"
                type="radio"
                disabled={fetching}
                onChange={() => selectFilter(name.toLowerCase())}
              />

              <span>{name}</span>
            </label>
          </p>
        ))}
      </form>
    </>
  );
}

function mapState(state) {
  return {
    filter: state.filter,
    fetching: state.fetching,
  };
}

export default connect(mapState, { setPageAction, setFilterAction })(Filters);

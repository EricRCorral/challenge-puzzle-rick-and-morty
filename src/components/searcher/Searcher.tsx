import React from "react";
import { connect } from "react-redux";
import { setSearcherValueAction } from "../../actions/query";

interface State  {
  searcherValue: string,
  setSearcherValueAction: {(searcherValue: string): any}
}

const Searcher = ({ searcherValue, setSearcherValueAction }: State) => {
  const noSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="row valign-wrapper" onSubmit={(e) => noSubmit(e)}>
        <div className="input-field col s11 m10">
          <i className="material-icons prefix">search</i>

          <input
            value={searcherValue}
            onChange={(e) => setSearcherValueAction(e.target.value)}
            type="text"
          />

          <label htmlFor="icon_prefix">Character, location, episode...</label>
        </div>

        <button
          className="btn-floating btn-small waves-effect waves-light red"
          disabled={searcherValue === ""}
          onClick={() => setSearcherValueAction("")}
        >
          <i className="material-icons">clear</i>
        </button>
      </form>
    </>
  );
};

const mapStateToProps = (state: State) => {
  return {
    searcherValue: state.searcherValue,
  };
};

export default connect(mapStateToProps, { setSearcherValueAction })(Searcher);

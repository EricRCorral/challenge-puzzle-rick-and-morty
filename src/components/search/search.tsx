import React from "react";
import { connect } from "react-redux";
import { setNameAction } from "../../redux/queryDuck";
import { State } from "../../interfaces/State";
import { Data } from "../../interfaces/Data";

function Search({ name, setNameAction }: Data) {
  function noSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <>
      <form className="row valign-wrapper" onSubmit={(e) => noSubmit(e)}>
        <div className="input-field col s11 m10">
          <i className="material-icons prefix">search</i>

          <input
            value={name}
            onChange={(e) => setNameAction(e.target.value)}
            type="text"
          />

          <label htmlFor="icon_prefix">Character, location, episode...</label>
        </div>

        <button
          className="btn-floating btn-small waves-effect waves-light red"
          disabled={name === ""}
          onClick={() => setNameAction("")}
        >
          <i className="material-icons">clear</i>
        </button>
      </form>
    </>
  );
}

function mapState(state: State) {
  return {
    name: state.name,
  };
}

export default connect(mapState, { setNameAction })(Search);

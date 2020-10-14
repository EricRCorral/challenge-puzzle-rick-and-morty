import React from "react";
import { connect } from "react-redux";
import { setSearcherValueAction } from "../../actions/query";
import { LOGO } from "../../assets/images";

interface State {
  searcherValue: string;
  setSearcherValueAction: { (searcherValue: string): any };
}

const noSubmit = (e: any) => {
  e.preventDefault();
};

const Searcher = ({ searcherValue, setSearcherValueAction }: State) => (
  <>
    <form className="row" onSubmit={(e) => noSubmit(e)}>
      <div className="col s12 m2">
        <img className="responsive-img logo-margin" src={LOGO} alt="Logo" />
      </div>
      <div className="input-field col s10 m9">
        <i className="material-icons prefix">search</i>

        <input
          value={searcherValue}
          onChange={(e) => setSearcherValueAction(e.target.value)}
          type="text"
          className="text-whitesmoke"
        />

        <label htmlFor="icon_prefix">Character, location, episode...</label>
      </div>
      <button
        className="btn-floating btn-small waves-effect waves-light teal btn-align"
        disabled={searcherValue === ""}
        onClick={() => setSearcherValueAction("")}
      >
        <i className="material-icons">clear</i>
      </button>
    </form>
  </>
);

const mapStateToProps = (state: State) => ({
  searcherValue: state.searcherValue,
});

export default connect(mapStateToProps, { setSearcherValueAction })(Searcher);

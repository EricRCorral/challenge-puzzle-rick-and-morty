import React from "react";
import { Cards, Filters, Footer, Search } from "./components/components";
import { connect } from "react-redux";
import { State } from "./interfaces/State";

function App({ name }: State) {
  return (
    <>
      <div className="container">
        <Search />

        <div className="row">
          <div className="col s12 m2 filters">
            <Filters />
          </div>

          <div
            className={
              name.length > 2
                ? "col s12 m9 l10 cards-border"
                : "col s12 m9 l10 cards-border-h"
            }
          >
            <Cards />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function mapState(state: State) {
  return {
    name: state.name,
  };
}

export default connect(mapState)(App);
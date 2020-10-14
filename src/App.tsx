import React from "react";
import { Cards, Filters, Footer, Searcher } from "./components";
import { connect } from "react-redux";

interface State {
  searcherValue: string;
}

const App = ({ searcherValue }: State) => (
  <>
    <div className="background-img">
      <div className="container">
        <Searcher />

        <div className="row">
          <Filters />

          <div
            className={
              searcherValue.length > 2
                ? "col s12 m9 l10 cards-border"
                : "col s12 m9 l10 cards-border-h"
            }
          >
            <Cards />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </>
);

const mapStateToProps = (state: State) => ({
  searcherValue: state.searcherValue,
});

export default connect(mapStateToProps)(App);

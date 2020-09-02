import React from "react";
import { Cards, Filters, Footer, Search } from "./components";
import { connect } from "react-redux";

interface State  {
  name: string
}

const App = ({ name }: State) => {
  return (
    <>
      <div className="container">
        <Search />

        <div className="row">
            <Filters />

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
};

const mapStateToProps = (state: State) => {
  return {
    name: state.name,
  };
};

export default connect(mapStateToProps)(App);

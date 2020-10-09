import { ApolloClient, InMemoryCache, DocumentNode } from "@apollo/client";
import queryCharacters, {
  Variables as CharactersVariables,
} from "../apollo/queries/queryCharacters";
import queryEpisodes, {
  Variables as EpisodesVariables,
} from "../apollo/queries/queryEpisodes";
import queryLocations, {
  Variables as LocationsVariables,
} from "../apollo/queries/queryLocations";
import {
  GET_DATA,
  GET_DATA_ERROR,
  SET_SEARCHER_VALUE,
  GET_DATA_SUCCESS,
  SET_CURRENT_CARD,
  SET_FILTER,
  SET_PAGE,
} from "./types";

interface Dispatch {
  (type: object): any;
}

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export let getDataAction = () => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  const FILTER: string = getState().filter;
  const PAGE: number = getState().page;
  const SEARCHER_VALUE: string = getState().searcherValue;

  dispatch({
    type: GET_DATA,
  });

  if (FILTER === "characters") {
    return client
      .query<DocumentNode, CharactersVariables>({
        query: queryCharacters,
        variables: { name: { name: SEARCHER_VALUE }, page: PAGE },
        errorPolicy: "all",
      })
      .then(({ data }) => {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DATA_ERROR,
          payload: true,
        });
      });
  } else if (FILTER === "locations") {
    return client
      .query<DocumentNode, LocationsVariables>({
        query: queryLocations,
        variables: { name: { name: SEARCHER_VALUE }, page: PAGE },
        errorPolicy: "all",
      })
      .then(({ data }) => {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DATA_ERROR,
          payload: true,
        });
      });
  } else {
    return client
      .query<DocumentNode, EpisodesVariables>({
        query: queryEpisodes,
        variables: { name: { name: SEARCHER_VALUE }, page: PAGE },
        errorPolicy: "all",
      })
      .then(({ data }) => {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DATA_ERROR,
          payload: true,
        });
      });
  }
};

export let setSearcherValueAction = (searcherValue: string) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_SEARCHER_VALUE,
    payload: searcherValue,
  });
  getDataAction()(dispatch, getState);
};

export let setFilterAction = (filter: string) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_FILTER,
    payload: filter,
  });
  setPageAction(1)(dispatch, getState);
  getDataAction()(dispatch, getState);
};

export let setPageAction = (page: number) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_PAGE,
    payload: page,
  });
  getDataAction()(dispatch, getState);
};

export let setCurrentCardAction = (currentCard: number) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_CURRENT_CARD,
    payload: currentCard,
  });
};

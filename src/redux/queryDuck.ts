import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  queryCharacters,
  queryEpisodes,
  queryLocations,
} from "../apollo/queries";
import { Action, State } from "../interfaces/Interfaces";

let initialData: State = {
  name: "",
  page: 1,
  filter: "characters",
  data: {},
  fetching: false,
  currentCard: 0,
};

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const GET_DATA = "GET_DATA";
const GET_DATA_ERROR = "GET_DATA_ERROR";
const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
const SET_NAME = "SET_NAME";
const SET_FILTER = "SET_FILTER";
const SET_PAGE = "SET_PAGE";
const SET_CURRENT_CARD = "SET_CURRENT_CARD";

export default function reducer(state = initialData, action: Action) {
  switch (action.type) {
    case GET_DATA:
      return { ...state, fetching: true };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: action.payload.error,
        fetching: false,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        error: action.payload.error,
        fetching: false,
      };
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_CURRENT_CARD:
      return { ...state, currentCard: action.payload };
    default:
      return state;
  }
}

export let getDataAction = () => (dispatch: Action, getState: { (): any }) => {
  let query =
    getState().filter === "characters"
      ? queryCharacters
      : getState().filter === "locations"
      ? queryLocations
      : queryEpisodes;

  dispatch({
    type: GET_DATA,
  });
  return client
    .query({
      query: query,
      variables: { name: { name: getState().name }, page: getState().page },
    })
    .then(({ data }) => {
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: { data, error: false },
      });
    })
    .catch(() => {
      dispatch({
        type: GET_DATA_ERROR,
        payload: { error: true },
      });
    });
};

export let setNameAction = (searcherVal: string) => (
  dispatch: Action,
  getState: { (): any }
) => {
  dispatch({
    type: SET_NAME,
    payload: searcherVal,
  });
  getDataAction()(dispatch, getState);
};

export let setFilterAction = (filter: string) => (
  dispatch: Action,
  getState: { (): any }
) => {
  dispatch({
    type: SET_FILTER,
    payload: filter,
  });
  getDataAction()(dispatch, getState);
};

export let setPageAction = (page: number, fromFilters: boolean) => (
  dispatch: Action,
  getState: { (): any }
) => {
  dispatch({
    type: SET_PAGE,
    payload: page,
  });
  if (fromFilters === undefined) {
    getDataAction()(dispatch, getState);
  }
};

export let setCurrentCardAction = (i: number) => (dispatch: Action) => {
  dispatch({
    type: SET_CURRENT_CARD,
    payload: i,
  });
};

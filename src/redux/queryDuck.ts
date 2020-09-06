import { ApolloClient, InMemoryCache, DocumentNode } from "@apollo/client";
import queryCharacters, {
  Response as CharactersResponse,
  Variables as CharactersVariables,
} from "../apollo/queries/queryCharacters";
import queryEpisodes, {
  Response as EpisodesResponse,
  Variables as EpisodesVariables,
} from "../apollo/queries/queryEpisodes";
import queryLocations, {
  Response as LocationsResponse,
  Variables as LocationsVariables,
} from "../apollo/queries/queryLocations";

interface State {
  name: string;
  page: number;
  filter: string;
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  fetching: boolean;
  currentCard: number;
}

interface Action {
  type: string;
  payload: any;
}

interface Dispatch {
  (type: object): any;
}

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

export let getDataAction = () => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  const FILTER: string = getState().filter;
  const PAGE: number = getState().page;
  const NAME: string = getState().name;

  dispatch({
    type: GET_DATA,
  });

  if (FILTER === "characters") {
    return client
      .query<DocumentNode, CharactersVariables>({
        query: queryCharacters,
        variables: { name: { name: NAME }, page: PAGE },
        errorPolicy: "all",
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
  } else if (FILTER === "locations") {
    return client
      .query<DocumentNode, LocationsVariables>({
        query: queryLocations,
        variables: { name: { name: NAME }, page: PAGE },
        errorPolicy: "all",
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
  } else {
    return client
      .query<DocumentNode, EpisodesVariables>({
        query: queryEpisodes,
        variables: { name: { name: NAME }, page: PAGE },
        errorPolicy: "all",
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
  }
};

export let setNameAction = (searcherVal: string) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_NAME,
    payload: searcherVal,
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
  getDataAction()(dispatch, getState);
};

export let setPageAction = (page: number, fromFilters: boolean) => (
  dispatch: Dispatch,
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

export let setCurrentCardAction = (i: number) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CURRENT_CARD,
    payload: i,
  });
};

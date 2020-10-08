import { Response as CharactersResponse } from "../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../apollo/queries/queryLocations";
import {
  GET_DATA,
  GET_DATA_ERROR,
  SET_SEARCHER_VALUE,
  GET_DATA_SUCCESS,
  SET_CURRENT_CARD,
  SET_FILTER,
  SET_PAGE,
} from "../actions/types";

interface State {
  searcherValue: string;
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

let initialData: State = {
  searcherValue: "",
  page: 1,
  filter: "characters",
  data: {},
  fetching: false,
  currentCard: 0,
};

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
    case SET_SEARCHER_VALUE:
      return { ...state, searcherValue: action.payload };
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

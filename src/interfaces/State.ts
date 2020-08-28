import { Data } from "./Data";

export interface State {
  name: string;
  page: number;
  filter: string;
  data: Data;
  fetching: boolean;
  currentCard: number;
  error?: boolean;
  getDataAction?: any;
  setNameAction?: any;
  setCurrentCardAction?: any;
  setFilterAction?: any
  setPageAction?: any
}

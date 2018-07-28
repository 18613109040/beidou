import { TABLE_LIST } from '../actions/baseTable';

const inintData = {
  count: 0,
  list: [],
  pageSize: 10,
  columns: [],
};
export function tableList(state = inintData, action) {
  const json = action.json;
  switch (action.type) {
    case TABLE_LIST:
      return json.data;
    default:
      return state;
  }
}

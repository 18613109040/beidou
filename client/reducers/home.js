export function home(state = {}, action) {
  const json = action.json;
  switch (action.type) {
    case 'ADD':
      return json;
    default:
      return state;
  }
}

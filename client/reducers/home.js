export function home(state={}, action) {
    let json = action.json;
    switch (action.type) {
        case 'ADD':
        console.dir(json)
            console.dir(json)
            return json
        default:
            return state
    }
}

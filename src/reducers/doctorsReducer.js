export const doctorsReducer = (state = [], action) => {
    switch(action.type){
        case 'FETCH_DOCTORS':
            return action.payload
        case 'ADD_DOCTOR':
            return [...state, action.payload]
        default:
            return state
    }
}
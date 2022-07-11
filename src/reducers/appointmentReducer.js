export const appointmentsReducer = (state = [], action) => {
  switch(action.type){
      case 'FETCH_APPOINTMENTS':
          return action.payload
      case 'ADD_APPOINTMENT':
          return [...state, action.payload]
      default:
          return state
  }
}
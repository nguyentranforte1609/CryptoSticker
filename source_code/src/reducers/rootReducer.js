const initialState = {
    coins : []
}

const rootReducer = (state = initialState, aciton) => {
    switch(aciton.type) {
        case "FETCH_DATA":
            return {
                ...state,
                coins: [
                    ...state.coins
                ]
            }
        default:
            return state;
    }
}

export default rootReducer;
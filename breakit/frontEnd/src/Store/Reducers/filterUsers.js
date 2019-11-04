const filterState = {
    dev: false,
    cto: false,
    meetup: false
}

const toggleUsers = (state = filterState, action) => {
    let nextState
    switch (action.type) {
        case 'DEV_ON':
            console.log('DEV_ON', action);

            if (state.dev === false) {
                nextState = {
                    ...state,
                    dev: true
                }
            } else {
                nextState = {
                    ...state,
                    dev: false
                }
            }
            return nextState || state;

           
        case 'CTO_ON':
            console.log('CTO_ON', action);

            if (state.cto === false) {
                nextState = {
                    ...state,
                    cto: true
                }
            } else {
                nextState = {
                    ...state,
                    cto: false
                }
            }
            return nextState || state;

        case 'MEETUP_ON':
            console.log('MEETUP_ON', action);

            if (state.meetup === false) {
                nextState = {
                    ...state,
                    meetup: true
                }
            } else {
                nextState = {
                    ...state,
                    meetup: false
                }
            }
            
            return nextState || state;
            
        default:
            return state;
    }
   
}

export default toggleUsers
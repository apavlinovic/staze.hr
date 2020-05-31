import { createStore, combineReducers } from 'redux';

const initialState = {
    trails: {},
    mountains: [],
};

const Actions = {
    Trails: {
        ADD_TRAIL: 'ADD_TRAIL',
    },
};

const trailsReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.Trails.ADD_TRAIL:
            return Object.assign({}, state, {
                [attr.key]: action.value,
            });

        default:
            return state;
    }
};

const Store = createStore(
    combineReducers({
        trails: trailsReducer,
        // mountains: mountainReducer,
    }),

    initialState,
);

export { Actions, Store };

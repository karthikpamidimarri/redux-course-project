
{
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'learn Redux',
        complete: false
    }
}

{
    type: 'REMOVE_TODO',
    id: 0
}

{
    type: 'TOGGLE_TODO',
    id: 0
}

{
    type: 'ADD_GOAL',
    goal:{
        id: 0,
        name: 'Run a Marathon'
    }
}

{
    type: 'REMOVE_GOAL',
    id: 0
}


/*
 * Characteristics of a Pure Function
 * 1) They always return the same result if the same arguments are passed in.
 * 2) They depend only on the arguments passed into them.
 * 3) Never produce any side effects.
 */

//Reducer function
function todos(state = [],action){
    if(action.type === 'ADD_TODO'){
        return state.concat([action.todo])
    } else if(action.type === 'REMOVE_TODO'){
        return state.filter((todo) => todo.id !== action.id);
    } else if(action.type === 'TOGGLE_TODO'){
        return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, {complete: !todo.complete})
        )
    } else {
        return state
    }
}

function createStore() {
    // The store should have four parts
    // 1. The State
    // 2. Get the state. (getState)
    // 3. Listen to changes on the state.(subscribe)
    // 4. Update the state (dispatch)

    let state;
    let listeners = [];


    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l!== listener)
        }
    }

    const dispatch = (action) => {
        state = todos(state,action)

        //loop over listeners and invoke them

        listeners.forEach((listener) => listener())
    }

    return{
        getState,
        subscribe,
        dispatch
    }
}

var store = createStore();

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'learn Redux',
        complete: false
    }
});
import {START, SUCCESS, FAIL} from '../constants/ActionTypes'

export default() => next => action => {
    const {
        callAPI,
        type,
        ...rest
    } = action

    if (!callAPI) 
        return next(action)

    next({
        ...rest,
        type: type + START
    })

    //setTimeout dev only!!!!
    setTimeout(() => fetch(callAPI).then(res => res.json()).then(response => {
        if (response.status === 'success') {
            return next({
                ...rest,
                type: type + SUCCESS,
                response: response.data
            })
        } else {
            return next({
                ...rest,
                type: type + FAIL,
                error: {
                    status: response.status,
                    message: response.message
                }
            })
        }

    }).catch(error => next({
        ...rest,
        type: type + FAIL,
        error
    })), 1000)
}
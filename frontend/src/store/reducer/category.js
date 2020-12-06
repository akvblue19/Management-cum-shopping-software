import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    category: [],
    idData: [],
    subData: [],
    isLoading: false,
    error: null,
    update: false
}

const categoryStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const categorySuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        isLoading: false
    })
}

const categoryFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}

const categoryUpdateStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true, update: null})
}

const categoryUpdateSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        update: action.done,
        isLoading: false
    })
}

const categoryUpdateFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        update: null,
        isLoading: false
    })
}
// ----------------------------
const categoryFetchStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const categoryFetchSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        category: action.data,
        isLoading: false
    })
}

const categoryFetchFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}

// --------------------------------------------
const categoryFetchByIdStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const categoryFetchByIdSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        idData: action.data,
        isLoading: false
    })
}

const categoryFetchByIdFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}

// -------------------------
const categoryDetailFetchStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const categoryDetailFetchSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        idData: action.data,
        isLoading: false
    })
}

const categoryDetailFetchFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}


const subCategoryStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const subCategorySuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        isLoading: false,
        subData: action.data
    })
}

const subCategoryFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.CATEGORY_POST_START:
            return categoryStart(state,action)
        case actions.CATEGORY_POST_SUCCESS:
            return categorySuccess(state,action)
        case actions.CATEGORY_POST_FAIL:
            return categoryFail(state,action)

        case actions.CATEGORY_FETCH_START:
            return categoryFetchStart(state,action)
        case actions.CATEGORY_FETCH_SUCCESS:
            return categoryFetchSuccess(state,action)
        case actions.CATEGORY_FETCH_FAIL:
            return categoryFetchFail(state,action)

        case actions.CATEGORY_FETCH_BY_ID_START:
            return categoryFetchByIdStart(state,action)
        case actions.CATEGORY_FETCH_BY_ID_SUCCESS:
            return categoryFetchByIdSuccess(state,action)
        case actions.CATEGORY_FETCH_BY_ID_FAIL:
            return categoryFetchByIdFail(state,action)

        case actions.CATEGORY_UPDATE_START:
            return categoryUpdateStart(state,action)
        case actions.CATEGORY_UPDATE_SUCCESS:
            return categoryUpdateSuccess(state,action)
        case actions.CATEGORY_UPDATE_FAIL:
            return categoryUpdateFail(state,action)

        case actions.CATEGORY_DETAIL_FETCH_START:
            return categoryDetailFetchStart(state,action)
        case actions.CATEGORY_DETAIL_FETCH_SUCCESS:
            return categoryDetailFetchSuccess(state,action)
        case actions.CATEGORY_DETAIL_FETCH_FAIL:
            return categoryDetailFetchFail(state,action)

        case actions.SUB_FETCH_START:
            return subCategoryStart(state,action)
        case actions.SUB_FETCH_SUCCESS:
            return subCategorySuccess(state,action)
        case actions.SUB_FETCH_FAIL:
            return subCategoryFail(state,action)
            
        default:
            return state
    }
}

export default reducer
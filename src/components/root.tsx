import { combineReducers } from "redux"
import { articleReducer } from "./article"
import { favouriteReducer } from "./favourite"
// import { sourceReducer } from "./models/source"

export const rootReducer = combineReducers({
    // sources: sourceReducer,
    // items: itemReducer,
    favourite: favouriteReducer,
    article: articleReducer,
})

export type AppState = ReturnType<typeof rootReducer>

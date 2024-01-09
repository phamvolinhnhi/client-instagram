import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";
import { ChatReducer } from "../Chat/Reducer";
import { CommentReducer } from "../Comment/Reducer";
import { MessageReducer } from "../Message/Reducer";
import { PostReducer } from "../Post/Reducer";
import { StoryReducer } from "../Story/Reducer";
import { UserReducer } from "../User/Reducer";

const rootReducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    post: PostReducer,
    comment: CommentReducer,
    story: StoryReducer,
    chat: ChatReducer,
    message: MessageReducer
})
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
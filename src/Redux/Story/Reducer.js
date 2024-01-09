import { CREATE_STORY, FOLLOWING_USER_STORY, USER_STORY } from "./ActionType";

const initalState = {
    stories: null,
    createdStory: null,
}

export const StoryReducer = (store=initalState, {type, payload}) => {
    if(type === USER_STORY || type === FOLLOWING_USER_STORY) {
        return({...store, stories: payload})
    }
    else if(type === CREATE_STORY) {
        return({...store, createdStory: payload})
    }
    return store;
}
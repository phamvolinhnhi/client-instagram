export const isPostLikedByUser = (post, userId) => {
    for(let item of post.likedByUsers) {
        if(item.id === userId)
            return true;
    }
    return false;
}

export const isSearching = (title) => {
    if(title === 'Search')
        return true;
    return false
}

export const isCommentLikedByUser = (comment, userId) => {
    
    for(let item of comment.likedByUsers) {
        if(item.id === userId)
            return true;
    }
    return false;
}

export const suggestions = (reqUser) => {
    const set = new Set(reqUser.following.map((item)=>JSON.stringify(item)));
    const result = reqUser.follower.filter(item => {
        return !set.has(JSON.stringify(item));
    })
    console.log('result: ', result);
    return result;
}

export const isSavedPost = (user, postId) => {
    for(let item of user.savedPost)
        if(item.id === postId)
            return true;
    return false;
}

export const isDeletedPost = (deletedPost, post) => {
        if(deletedPost === post)
            return true;
    return false;
}

export const isFollowing = (reqUser, user2) => {
    if(reqUser && user2) {
        for(let item of reqUser.following)
            if(item.id === user2.id)
                return true;
    }
    return false;
}

export const isReqUser = (userId1, userId2) => {
    if(userId1 && userId2)
        return userId1 === userId2;
}

export const isReqUserPost = (post, reqUser) => {
    return post.user.id === reqUser.id;
}

function getTimeInHours(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours;
}

export const hasStory = (users) => {
    if (!Array.isArray(users)) {
        // If users is not an array, handle the error accordingly.
        console.error("Input is not an array");
        return [];
    }
    const temp = users.reduce((acc, item) => {
        if(item.stories?.length > 0){
            const time = getTimeInHours(
                item.stories[item.stories?.length - 1].timeStamp
            );
        
            if(time < 24) 
                acc.push(item);
        }
        return acc;
    }, []);
    return temp;
}

export const activeStory = (stories) => {
    const temp = stories.reduce((acc, item) => {
        const time = getTimeInHours(item.timestamp);
        if(time < 24) 
            acc.push(item);
        return acc;
    }, []);
    return temp;
}

export const timeDifference = (timestamp) => {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);
    if(weeks > 0)
        return weeks + ' week' + (weeks === 1? '' : 's') + ' ago';
    else if(days > 0)
        return days + ' day' + (days === 1? '' : 's') + ' ago';
    else if(hours > 0)
        return hours + ' hour' + (hours === 1? '' : 's') + ' ago';
    else if(minutes > 0)
        return minutes + ' minute' + (minutes === 1? '' : 's') + ' ago';
    else if(seconds > 0)
        return seconds + ' second' + (seconds === 1? '' : 's') + ' ago';
}
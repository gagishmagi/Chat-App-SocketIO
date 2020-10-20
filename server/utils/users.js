users = []

// when user join the room save user data
function userJoin(id, username, room){
    const user = {id, username, room}

    users.push(user);

    return user;
}

//get the current user by id
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

// leave the user from the room by id
function userLeave(id){
    const index = users.findIndex( user => user.id === id)

    if(index !== -1 ){
        return users.splice(index, 1)[0]
    }
}

//get all the users of this room
function getRoomsUser(room){
    return users.filter( user => user.room === room)
}

module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
    getRoomsUser
}

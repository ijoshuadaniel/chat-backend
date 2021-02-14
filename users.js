


const adduser = ({id,name,room}) => {

 name = name.trim().toLowerCase();
 room = room.trim().toLowerCase();

 const existingUser = users.find((user) => user.name === name && user.room == room);

if(existingUser){
    return {error : 'Username in use'};
}

const user = { id, name , room};
users.push(user);
 return user;
}

const removeuser = (id) => {
const index = users.findIndex((user) => users.id == id);
if(index !== -1 ){
    return users.splice(index,1)[0];
}
}

const getuser = (id) => users.find((user) => user.id === id);

const getuserinroom = (room) =>  users.filter((user)=> users.room === room);

module.exports = (adduser,removeuser,getuser,getuserinroom);
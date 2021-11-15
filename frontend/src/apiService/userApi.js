import url from "../config/config"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createUser = (user) => {
    return fetch(`${url}/api/users`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}



const updateUser = (id, data) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}


const getAuthor = (id) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const softDelete = (id) => {
    return fetch(`${url}/api/users/softDelete/${id}`, {
        method: "PUT",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}
export { createUser, updateUser, getAuthor, softDelete }
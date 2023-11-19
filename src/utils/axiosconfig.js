const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

console.log(getTokenFromLocalStorage)

export const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.accessToken : ""}`,
        Accept: "application/json"
    },
}
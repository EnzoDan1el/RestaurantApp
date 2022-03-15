const BASE_URL = "https://devcamp-2022-1-restaurant.azurewebsites.net/api/";

export const fetchFunction = async (request, method, payload, body=null) => {
    const response = await fetch(`${BASE_URL}${request}`, {
        method: method,
        body: body,
        headers: payload

    })

    if(!response.ok){
        return response;
    }

    const data = await response.json();
    return data;
}

const loginFetch = async (email, password) => {

    const body = {
        "email": email,
        "password": password
    }

    const firstHeader = {
        Accept: "text/plain",
        "Content-Type": "application/json"
    }

    const data = await fetchFunction('authorize', 'POST', firstHeader, JSON.stringify(body));

    if (typeof(data) === 'string'){
        return data;
    }

    const { token_type, access_token } = data;

    const secondHeader = {
        Accept: "text/plain",
        Authorization: `${token_type} ${access_token}`
    }

    const returnValue = await fetchFunction('users/me', 'GET', secondHeader);

    const {role} = returnValue;

    return {token_type, access_token, role};
}

export default loginFetch;



export const fetchNew = async (token_type, access_token, body) => {
    const response = await fetch("https://devcamp-2022-1-restaurant.azurewebsites.net/api/users", {
        body: JSON.stringify(body),
        headers: {
            Accept: "text/plain",
            Authorization:`${token_type} ${access_token}` ,
            "Content-Type": "multipart/form-data"
        },
        method: "POST"
    })

    const data = await response.json();

    return data;
}
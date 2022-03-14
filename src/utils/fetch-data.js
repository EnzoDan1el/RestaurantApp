const BASE_URL = "https://devcamp-2022-1-restaurant.azurewebsites.net/api/";

export const fetchFunction = async (request, method, payload, body=null) => {
    const response = await fetch(`${BASE_URL}${request}`, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: payload

    })

    if(!response.ok){
        return response.statusText;
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

    const data = await fetchFunction('authorize', 'POST', firstHeader, body);

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
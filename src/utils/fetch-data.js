const loginFetch = async (email, password) => {

    const body = {
        "email": email,
        "password": password
    }

    const response = await fetch("https://devcamp-2022-1-restaurant.azurewebsites.net/api/authorize", {
          body: JSON.stringify(body),
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json"
          },
          method: "POST"
    })


    if(!response.ok){
        return response.statusText;
    }

    const data = await response.json();
    const { token_type, access_token } = data;

    const secondRequest = await fetch("https://devcamp-2022-1-restaurant.azurewebsites.net/api/users/me", {
        headers: {
          Accept: "text/plain",
          Authorization: `${token_type} ${access_token}`
        }
    })

    const returnValue = await secondRequest.json();

    const {role} = returnValue;

    return {token_type, access_token, role};
}

export default loginFetch;
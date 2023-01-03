/// makeAPIRequest.js

export default async function makeAPIRequest(endpoint, method, body) {

    const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: body && JSON.stringify(body)
    }).catch(() => {
        return null;
    });

    return response && await(response.json());
}
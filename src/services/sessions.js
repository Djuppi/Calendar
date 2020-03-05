const API_URL = "http://localhost:3333";

export const login = async ({ email, password }) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    return response.json()
}

export const getAllEvents = async () => {
    const response = await fetch(`${API_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}

export const createNewEvent = async ({name, startdate, enddate}) => {
    const response = await fetch(`${API_URL}/event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, startdate, enddate})
    })
    return response.json()
}

export const createNewUser = async ({name, email, password, color}) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, color})
    })
    return response.json()
}
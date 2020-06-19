import User from './user'
const api = '/api/pizzas'

// TODO recuperar el usuario de la indexdb y mandarlo
// al servidor
class PizzaClient {
    async get(id) {
        const response = await fetch(`${api}/${id}`)
        return await response.json();
    }
    async add(data) {
        const user = await User.get();
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }

    async update(id, data) {
        return await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export default new PizzaClient();
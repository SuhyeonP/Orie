import fetch from 'isomorphic-unfetch'

const projects = [
    'user/1',
    'user/2'
]

export default (req, res) => {
    if (req.query.id) { //들어갓을때 (링크)
        // a slow endpoint for getting repo data
        fetch(`https://jsonplaceholder.typicode.com/users/${req.query.id}`)
            .then(res => res.json())
            .then(data => {
                res.json(data)
            })

        return
    }
    res.json(projects)
}

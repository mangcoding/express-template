const { getAllUsers } = require('../services/userServices');

const homepage = (req, res) => {
    res.render('pages/index');
}

const about = (req, res) => {
    const todos = [
        { name: 'Wash the car' },
        { name: 'Walk the dog' },
        { name: 'Write some code' }
    ];

    res.render('pages/about', { todos });
}

const usersView = async(req, res) => {
    const userAll = await getAllUsers();
    res.render('pages/users', { users:userAll.users });
}

module.exports = {
    homepage,
    about,
    usersView
}
const router = require('express').Router();
const userController = require('../../../controllers/userController');

// router.get('/', getTodos);

router.route('/')
    .get()
    .post(async (req, res) => {
        try {
            const user = await userController.createUser(req.body);
            console.log(user);


            await req.session.save();

            req.session.loggedIn = true;
            req.session.userId = user.id;
            console.log(
                'File: user-routes.js ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );

            res
                .status(200)
                .json({ user: user, message: 'You are now logged in!' });
        } catch (err) {
            console.log(err);
            res.status(500).render('login', { failedCreation: true });
        }
    })

router.route('/:id')
    .get()
    .put((req, res) => {
        const user = userController.updateUser(req.params.id, req.body);

    })

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await userController.checkUserByEmail(req.body.email);

        if (!dbUserData) {
            res.render('login', { failedLogin: true });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.render('login', { failedLogin: true });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;
            console.log(
                'File: user-routes.js ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );

            res.render('home');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})


module.exports = router;
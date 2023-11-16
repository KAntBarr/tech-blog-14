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

            req.session.lastView = 'home';

            req.session.lastMessage = 'You are now logged in!';

            res.render(req.session.lastView, { message: req.session.lastMessage, loggedIn: req.session.loggedIn });
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
            req.session.lastMessage = "Incorrect email or password, please try again";
            res.render('login', { failedLogin: true, message: req.session.lastMessage });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            req.session.lastMessage = "Incorrect email or password, please try again";
            res.render('login', { failedLogin: true, message: req.session.lastMessage });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;
            console.log(
                'File: user-routes.js ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );
    
            req.session.lastView = 'home';
    
            req.session.lastMessage = "your in the mainframe!";
    
            console.log("user logged in-------");
            res.render(req.session.lastView, { message: req.session.lastMessage, loggedIn: req.session.loggedIn });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            console.log("user logged out------");
            res.render('login');
        });
    } else {
        res.render('login');
    }
})


module.exports = router;
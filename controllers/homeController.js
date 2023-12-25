const { User, Comment, Post } = require("../models");

async function showHome(req, res) {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
      order: [['created_on', 'DESC']]
    });

    // console.log(posts);

    if (posts) {
      const plainPosts = posts.map(post => post.get({ plain: true }));

      res.render('home', {
        logged_in: req.session.logged_in,
        username: req.session.username,
        user_id: req.session.userID,
        posts: plainPosts
      });
    } else {
      throw new Error("problem getting all posts");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    // throw Error(error);
  }
}

async function showDashboard(req, res) {
  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.session.userID,
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['created_on', 'DESC']]
    });

    console.log(posts);

    if (posts) {
      const plainPosts = posts.map(post => {
        let result = post.get({ plain: true });
        result['is_dashboard'] = true;
        return result;
      });

      res.render('dashboard', {
        logged_in: req.session.logged_in,
        username: req.session.username,
        user_id: req.session.userID,
        posts: plainPosts
      });
    } else {
      throw new Error("problem getting user's posts");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    // throw Error(error);
  }
}

async function showProfile(req, res) {
  try {
    let user = await User.findByPk(req.session.userID);
    user = user.get({ plain: true });

    res.render('profile', {
      logged_in: req.session.logged_in,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    // throw Error(error);
  }
}

function showLogin(req, res) {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: true,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
}

function showSignup(req, res) {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: false,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
}

async function signOutUser(req, res) {
  req.session.destroy(() => {
    // console.log("---user logged out---");
    res.redirect('/');
    // res.status(200).send("user has been succesfully logged out");
  });
}


module.exports = {
  showHome,
  showDashboard,
  showProfile,
  showLogin,
  showSignup,
  signOutUser
}
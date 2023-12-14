const {
    User,
    Post,
    Comment
} = require('../models');

const userData = require('./user-seeds.json');
const postData = require('./post-seeds.json');
const commentData = require('./comment-seeds.json');

const sequelize = require('../config/connection');

async function seedUsers() {
    let users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    users = users.map(user => {
        const {
            dataValues: {
                id,
                username
            }
        } = user;

        return { id, username };
    });

    return users;
}






const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    const users = await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    console.log(users);
    const posts = await seedPosts(users);
    console.log('\n----- POSTS SEEDED -----\n');
    console.log(posts);
    const comments = await seedComments(posts);
    console.log('\n----- COMMENTS SEEDED -----\n');
    console.log(comments);
};

seedAll();

module.exports = seedAll;
var casual = require('casual');

module.exports = () => {
    const data = { posts: [] }
    // create 1000 users
    for (let i = 0; i < 25; i++) {
        data.posts.push({ id: i, title: casual.title, content: casual.sentences(n=50), author: casual.name });
    }
    return data;
}


// Pour lancer : json-server --watch fillDB.js
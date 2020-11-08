const mongoose = require('mongoose');
const idGenerator = () => {
    const random = "abcdefghklm0123456789".split("");
    let newString = "";
    for (let i = 0; i < 10; i++) {
        const RandomInGenerator = random[Math.floor(Math.random() * random.length)];
        newString += RandomInGenerator;
    }
    return newString;
}
const UrlModel = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: idGenerator()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});


module.exports = mongoose.model('UrlModel', UrlModel);
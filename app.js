const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UrlModel = require('./models/UrlModel');

app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/url-shortener-mine',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const dataUrl = await UrlModel.find();
    res.render('index', ({ dataUrl }));
});
app.get('/:shortUrl', async (req, res) => {
    const dataShortUrl = await UrlModel.findOne({short:req.params.shortUrl});
    if (dataShortUrl == null) return res.status(404);
    dataShortUrl.clicks++;
    dataShortUrl.save();
    res.redirect(dataShortUrl.full);
});
app.post('/shortUrls', async (req, res) => {
    await UrlModel.create({ full: req.body.fullUrl });
    res.redirect('/');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`App is running at ${PORT}`);
});
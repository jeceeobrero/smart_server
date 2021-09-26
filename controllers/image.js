const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '54897f17fee34630a23efe1a91465e82'
   });

const handleAPICall = (req, res) => {
    app.models.
    predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to api'))
}

const handleImage = (db) => (req,res) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if(entries.length)
            res.json(entries[0]);
        else
            res.status(404).json('not found');  
    })
    .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleImage,
    handleAPICall
}
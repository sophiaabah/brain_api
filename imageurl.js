const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'be7bff1f29ca46c28f14157209777a62'
 });

 const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with api'))
 }

 module.exports = {
  handleApiCall: handleApiCall
};
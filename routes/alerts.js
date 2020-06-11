var express = require('express');
var router = express.Router();
var path = require('path');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var AlertSchema = new Schema({
  user: String,
  alertname: String,
  alerthtml: String,
  alertcss: {
    button: Object,
    alertBox: Object,
    alertMessage: Object,
  },
}, { timestamps: { createdAt: 'created_at' } })

var AlertModel = Mongoose.model("alert", AlertSchema)

/* GET users listing. */
router.get('/alerts', async function(req, res) {
  try {
    var result = await AlertModel.find().exec();
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
});

router.get('/alerts.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/alerts.html'));
})

router.post('/alert', async function (req, res) {
  try {
    var alert = new AlertModel(req.body);
    var result = await alert.save();
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
})


module.exports = router;

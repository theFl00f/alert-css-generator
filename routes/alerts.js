var express = require('express');
var router = express.Router();
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var AlertSchema = new Schema({
  user: String,
  alertname: String,
  alerthtml: {
    button: String,
    alertBox: String,
    alertMessage: String,
  },
  alertcss: {
    button: String,
    alertBox: String,
    alertMessage: Object,
  },
}, { timestamps: { createdAt: 'created_at' } })

var AlertModel = Mongoose.model("alert", AlertSchema)


async function getAlerts(req, res, next) {
  try {
    var result = await AlertModel.find().exec();
    res.send(result)
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

// **GET alerts listing. 
router.get('/api/alerts', getAlerts);

// **GET alerts html
router.get('/alerts.html', getAlerts, function (req, res) {
  res.render('alerts.html')
})

router.get('/alert/:id', async function(req, res) {
  try {
    var result = await AlertModel.findById(req.params.id).exec();
    res.send(result)
  } catch (err) {
    console.log(err)
  }
})

//POST alert
router.post('/api/alert', async function (req, res) {
  try {
    var alert = new AlertModel(req.body);
    var result = await alert.save();
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
})


module.exports = router;

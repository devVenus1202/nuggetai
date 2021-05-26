const eventHelper = require('../helpers/eventHelper');

exports.writeEvent = async function (req, res) {
  const event_id = req.params.event_id;
  const event_type = req.body.event_type;
  const event_data = req.body.data;

  const event = await eventHelper.writeEvent(event_id, event_type, event_data);

  if (event) {
    res.status(200).json({
      success: true,
      msg: "event write success"
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'event write failed',
    });
  }
}
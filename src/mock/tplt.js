const Mockjs = require('mockjs');

function Mock(app) {
  app.get('/todos/1', function(req, res) {
    const data = Mockjs.mock({
      'data|1-10': [{ 'id|+1': 1 }],
      code: 0,
    });
    res.json(data);
  });
}

module.exports = Mock;

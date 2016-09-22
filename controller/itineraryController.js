
function(req, res) {
  db.entry.findAll({
    where : {
      username: req.user.username
    }
  }
  ).then(function(data) {
  res.render('plan/view', {data:data});
})

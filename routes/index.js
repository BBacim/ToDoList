const router = require("express").Router();
const connection = require("../config/database");
const User = connection.models.User;



router.get("/", function (req, res) {
  //console.log(req.sessionID);
  User.find({_id: req.sessionID}, (err, data) => {
    if (err) {
      res.render("list", {
        listTitle: new Date().toLocaleDateString("en-US", { weekday: "long" }),
        items: []
      });
    } else {
      //console.log(data);
      res.render("list", {
        listTitle: new Date().toLocaleDateString("en-US", { weekday: "long" }),
        items: data[0]? data[0].items : []
      });
    }
  });
});



router.post("/", function (req, res) {
  if (req.body.newItem.match(/\w/g)) {
    User.updateOne({_id: req.sessionID}, {$push: {items: {item: req.body.newItem} }}, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });
  }
  res.redirect("/");
});



router.post("/delete", function (req, res) {
    User.findOneAndUpdate(
        {_id: req.sessionID},
        {"$pull": {"items": {_id: req.body.deletedItem}}},
        (err, result) => {
            if (err) console.log(err);
            else console.log(result);
        }
    );

    setTimeout(() => {
      res.redirect("/");
    }, 50);
});



module.exports = router;

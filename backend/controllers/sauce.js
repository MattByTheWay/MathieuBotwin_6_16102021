const Sauce = require('../models/sauce');


exports.createSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    console.log(sauce);
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce Crée !'}))
      .catch(error => { 
      console.log(error);
      res.status(400).json({ error })});
  };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(thing => res.status(200).json(thing))
  .catch(error => res.status(404).json({ error }));

 };
 
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// exports.modifyOneSauce = (req, res, next) => {
   
//   };

 
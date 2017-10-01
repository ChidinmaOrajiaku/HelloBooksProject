import models from '../models';

const Profile = models.Profile;
const profileController = {
  createProfile(req, res) {
    // create user
    return Profile
      .create({
        image: req.body.image,
        status: req.body.status,
        description: req.body.description,
        interest: req.body.interest,
        gender: req.body.gender,
        usersId: req.params.usersId,
      })
      .then(profile => res.status(201).send(profile))
      .catch((error) => {
        // const errorMessage = error.errors.map((value) => {
        //   return value.message;
        // });
        res.status(400).send(error);
      });
  },
  getProfile(req, res) {
    return Profile
      .findAll({
        where: {
          usersId: req.params.usersId
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
};

export default profileController;

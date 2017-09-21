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
        const errorMessage = error.errors.map((value) => {
          return value.message;
        });
        res.status(400).send(errorMessage);
      });
  },
};

export default profileController;

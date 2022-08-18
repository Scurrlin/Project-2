const Profile = require('../models/profile');
const { generateHashKey } = require('../config/authHelper');

const show = async (req, res) => {
  try {
    const profileDocuments = await Profile.find({
      googleId: req.user.googleId,
    });
    const profileDocument = profileDocuments[0];
    return res.render('profiles/show', { profile: profileDocument });
  } catch (err) {
    return res.redirect('/profiles');
  }
};

const createAuthKey = async (req, res) => {
  try {
    const profileDocuments = await Profile.find({
      googleId: req.user.googleId,
    });
    const profileDocument = profileDocuments[0];
    profileDocument.authentication.key = generateHashKey(
      profileDocument._id.toString()
    );
    profileDocument.authentication.count++;
    profileDocument.save();
    return res.render('profiles/show', { profile: profileDocument });
  } catch (err) {
    return res.redirect('/profiles');
  }
};

module.exports = {
  createAuthKey,
  show,
};
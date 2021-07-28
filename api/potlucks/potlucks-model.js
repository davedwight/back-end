const db = require("../data/db-config");

function getUserAttending(user_id) {
  return db("potlucks as p")
    .join("potluck_invites as pi", "p.potluck_id", "pi.potluck_id")
    .join("users as u", "p.organizer_id", "u.user_id")
    .select(
      "p.potluck_name",
      "p.potluck_date",
      "p.potluck_time",
      "u.username as organizer"
    )
    .where("pi.user_id", user_id)
    .andWhere("pi.attending", true);
}

function getUserInvites(user_id) {
  return db("potlucks as p")
    .join("potluck_invites as pi", "p.potluck_id", "pi.potluck_id")
    .join("users as u", "p.organizer_id", "u.user_id")
    .select(
      "p.potluck_name",
      "p.potluck_date",
      "p.potluck_time",
      "u.username as organizer"
    )
    .where("pi.user_id", user_id)
    .andWhere("pi.attending", false);
}

function getPotluckById(potluck_id) {
  return db("potlucks as p")
    .join("users as u", "p.organizer_id", "u.user_id")
    .select(
      "p.potluck_id",
      "p.potluck_name",
      "p.potluck_date",
      "p.potluck_time",
      "p.potluck_location",
      "u.username as organizer"
    )
    .where("p.potluck_id", potluck_id);
}

module.exports = {
  getUserAttending,
  getUserInvites,
  getPotluckById,
};

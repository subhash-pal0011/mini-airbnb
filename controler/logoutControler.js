module.exports.logout = (req, res, next) => {
       req.logout((err) => { // passport ka ek method hii jo ixsits krta hii logOut callback ke sath hum pahle error ko pakd lenge.
              if (err) {
                     return next(err);
              }
              req.flash("success", "You have successfully logged out!");  // Flash success message
              res.redirect("/index");  // Redirect to index after logging out
       });
}
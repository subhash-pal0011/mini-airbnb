let User = require("../schemas/signupSchema");
module.exports.signup = async (req, res, next) => {
       try {
              const { email, username, password } = req.body;

              // Create a new User instance with email and username
              const newUser = new User({ email, username });

              // Register the user with the provided password
              const registeredUser = await User.register(newUser, password);

              // Automatically log in the user after successful registration
              req.login(registeredUser, (err) => {
                     if (err) return next(err);

                     req.flash("success", "Welcome to Airbnb!");
                     res.redirect("/index");
              });

       } catch (e) {
              req.flash("error", e.message); // More informative error (e.g., "A user with the given username is already registered")
              res.redirect("/signup");
       }
};

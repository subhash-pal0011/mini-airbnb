module.exports.isLogin = (req, res, next) => {
       if (!req.isAuthenticated()) {
              req.session.redirectUrl = req.originalUrl;  // isko middelware mea bana ke is liye dale hii ki passport jese login krega vese  ye delete kr dega to ise middeleware mea bana ke local mea dal denge to kucch nhi kr payega.
              req.flash("error", "Please log in first!");
              return res.redirect("/login");
       }
       next();
};

module.exports.storeReturnTo = (req, res, next) => {
       if (req.session.redirectUrl) {
              res.locals.redirectUrl = req.session.redirectUrl;
       }
       next();
};

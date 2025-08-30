module.exports.login = (req, res) => {
       req.flash("success", "Welcome!");
       // res.redirect(res.locals.redirectUrl); ISSE AGR HUM MEAIN PAGE PAR LOGIN KR RHE HII TO BATA RHA HII ROUTE NOT FOUND.

      // USKE LIYE HENDEL
       const redirectUrl = res.locals.redirectUrl || "/index";  // AGR res.locals.redirectUrl  YE EXSITS KRTA HII TO ISKO EK VARIABLE MEA DALKE REDIRECT KRA DO VRNA /INDEX PR.
       res.redirect(redirectUrl);
}
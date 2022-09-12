import passport from 'passport';

export const authLocal = 
passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
})

export const authSignup = (req, res) => {
    res.render("auth/signup");
}

export const authSignin = (req, res) => {
    res.render("auth/signin");
}

export const authPost = (req, res, next) => {
    passport.authenticate("local.signin", {
      successRedirect: "/profile",
      failureRedirect: "/signin",
      failureFlash: true,
    })(req, res, next);
}

export const renderProfile = (req, res) => {
    res.render("profile");
}

export const renderLogout = (req, res) => {
    req.logOut();
    res.redirect("/signin");
}
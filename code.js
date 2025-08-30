// if (process.env.NODE_ENV !== "production") {
//        require('dotenv').config();
// }
// const express = require("express");
// const session = require('express-session'); //✅  flesh use karne ke sath sath ye bhi install and add krna padhta hii install i express-session
// const mongoose = require('mongoose');
// const engine = require('ejs-mate');
// const methodOverride = require('method-override');
// const RoutingError = require("./errorFolder/routNotDefine");

// const customerror = require("./errorFolder/if_else_error_handling");
// const flash = require('connect-flash'); // ✅ flesh ke liye 
// // passport yani login and signup ke liye .
// let passport = require("passport"); // 1--hum sabse pahale passport ko require kar lenge.
// let LocalStrategy = require("passport-local"); // 2--hum yaha pe pasport local ko require kar lenge . 
// // 3-- [ passport-local-mongoose ] isko to hum schema vale mea require to kiye hi hii.
// let User = require("./schemas/signupSchema");
// const { isLogin, storeReturnTo } = require("./middelware_app/login_middielware");
// let allList = require("./controler/postControlerAndReview");
// let sign = require("./controler/signupControler");
// let log = require("./controler/loginControler");
// let out = require("./controler/logoutControler");
// const multer = require('multer');
// const { storage } = require("./cloudinary");
// const upload = multer({ storage });

// main()
// .then(() => console.log("Mongosh ok !"))
// .catch(err => console.log(err));


// async function main() {
//        await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
// }

// let app = express();
// app.use(flash());  //✅  flesh ke liye 
// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.engine('ejs', engine);
// app.use(methodOverride('_method'));
// app.use(express.urlencoded({ extended: true }));  // 🛑 urlencoded iska matlb hii ki abhi tak hum hamar form urlencoded data bajta tha but hum  ab form se file mea bhejna chahate hii to use case add karna padta hii form mea jakr [ enctype = "multiple data"]

// app.use(session({
//        secret: 'yourSecretKey', // hum yaha pe koi bhi string likh sakte hii.
//        resave: false,
//        saveUninitialized: true
// }));

// // 🛑ye sare bhi signup amd login ke liye use.
// app.use(passport.initialize());
// app.use(passport.session()); // yaha pe session ka bhi use hua hii.
// passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



// // 🛑
// // ✅ ISKOP IS TARIKE SE LIKHA JATA HII SHI TARIKA HII USE TRY CATCH.
// // ✅ BIT ISSSE ACCHA LIKNE KA TARIKA HII HUM EK JAGHA DEFINE KAR DE AUR USE REQUIRE KARKE PICCHE USE KAR LE IS CODE MEA USKA NAME HII COUSTEMERROR
// // app.get("/index", async (req,res)=>{
// //        try{
// //               let data = await mainSchema.find();
// //               res.render("mainpage", { data });
// //        }
// //        catch(err){
// //               res.send(err)
// //        }
// // })

// // MIDDELEWARE FLESH KA
// app.use((req, res, next) => {
//        // HUM DIRECT EJS FILE MEA ERROR KO BHEJ NHI SAKTE  NA HUM BEJ PAYENGE NA HI DESIGN KR PAYENGE IS LIYE ISE LOCALS MEA DAL KR .
//        res.locals.success = req.flash("success");
//        res.locals.errors = req.flash("error");
//        res.locals.currentUser = req.user;  // iskja kisi se kucch lena dena nhi hii iska use hota corrent user nikalna  isko hum isme res.locals.currentUser is liye rakhe hii hum direct ejs file mea bhrj nhi skte na is liye
//        next();
// });

// app.get("/index/newpost", isLogin, (req, res) => {
//        res.render("post");
// });

// // main page route
// app.get("/", customerror(allList.homePage));

// // view details
// app.get("/index/:id", customerror(allList.details));

// // edit rout
// app.get("/index/:id/detail", isLogin, customerror(allList.edit));

// //update route                        //yaha pe ise likhna padega upload.single('image').
// app.post("/index/:id/update", isLogin,upload.single('image'), customerror(allList.update));

// app.post("/index/newpost/submit", upload.single('mainSchema[image]'), customerror(allList.newpostSabmit));


// app.get("/index/:id/deletepost", isLogin, customerror(allList.deletePost));

// app.post("/index/:id/review", isLogin, customerror(allList.newReviewAdd));
// app.get("/index/:id", customerror(allList.patanhi));

// app.get("/index/:id/review/:reviewid", isLogin, customerror(allList.reviewDelete));

// app.get("/signup", (req, res) => {
//        res.render("sign_up_form");
// })
// app.post("/signup", customerror(sign.signup));

// app.get("/login", (req, res) => {
//        res.render("login_form");
// })

// app.post("/login",
//        storeReturnTo,
//        passport.authenticate("local", {
//               failureRedirect: "/login",
//               failureFlash: true
//        }),
//        log.login
// );

// app.get("/logout", out.logout);

// // YE BHI USKA PART HII  ROUTE NOT FOUND VALE KA
// app.use((req, res, next) => {
//        next(new RoutingError(404, "Route not found, please try again!")); // YE VALI STRING PRINT HOGI NICHE DEKHO USME.
// });

// app.use((err, req, res, next) => {
//        // Handle Mongoose errors yani price vala 
//        if (err.name === "ValidationError") {
//               validationMsg = err.errors?.price?.properties?.message || err.message;
//               req.flash("error", validationMsg);
//        }
//        const url = req.originalUrl; // uper dekhoge agr jese validation fail hota tha new post mea turnt bhag jata the /index route pr ESE CHIJ KO HENDEL KARNE KE LIYE USE KARTE THE ESE
//        if (url.includes("/newpost/submit")) {
//               req.flash("error", err.message) // isme hume condition nhi lagani padi ki price low hii to ye flesh karao agr char nhi shi hii to ye karao.
//               return res.redirect("/index/newpost");
//        }
//        if (url.includes("/index/:id/review")) {
//               const id = req.params?.id || req.body?.id || req.query?.id; // तीनों जगह देखो
//               if (!id) {
//                      req.flash("error", "ID नहीं मिली, कृपया पुनः प्रयास करें।");
//                      return res.redirect("/index");
//               }
//               req.flash("error", err.message || "Review डालते समय कुछ गड़बड़ हो गई।");
//               return res.redirect(`/index/${id}`);
//        }
//        // ye mescally sare error ko hendel kar lega. ag koi error ko define ya hendel nhi kya hii to tumne. // iske karna last mea jaruri hii.
//        req.flash("error", err.message || "Something went wrong!");  // is vale err ke message mea o string print hogi.
//        return res.redirect("/index");
// });


// const port = 8080;
// app.listen(port, () => {
//        console.log(`page listening ${port}`)
// })





if (process.env.NODE_ENV !== "production") {
       require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const RoutingError = require("./errorFolder/routNotDefine");
const customerror = require("./errorFolder/if_else_error_handling");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./schemas/signupSchema");
const { isLogin, storeReturnTo } = require("./middelware_app/login_middielware");

const allList = require("./controler/postControlerAndReview");
const sign = require("./controler/signupControler");
const log = require("./controler/loginControler");
const out = require("./controler/logoutControler");

const multer = require("multer");
const { storage } = require("./cloudinary");
const upload = multer({ storage });

// ================== DB Connection ==================
main()
       .then(() => console.log("MongoDB connected ✅"))
       .catch((err) => console.log("MongoDB Error ❌", err));

async function main() {
       await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

// ================== App Config ==================
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// ================== Session & Flash ==================
app.use(
       session({
              secret: "yourSecretKey",
              resave: false,
              saveUninitialized: true,
       })
);
app.use(flash());

// ================== Passport ==================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================== Flash Middleware ==================
app.use((req, res, next) => {
       res.locals.success = req.flash("success");
       res.locals.errors = req.flash("error");
       res.locals.currentUser = req.user;
       next();
});

// ================== Routes ==================

// New Post Form
app.get("/index/newpost", isLogin, (req, res) => {
       res.render("post");
});

// Home page
app.get("/", customerror(allList.homePage));

// ✅ Extra route for /index
app.get("/index", customerror(allList.homePage));

// Details
app.get("/index/:id", customerror(allList.details));

// Edit
app.get("/index/:id/detail", isLogin, customerror(allList.edit));

// Update Post
app.post(
       "/index/:id/update",
       isLogin,
       upload.single("image"),
       customerror(allList.update)
);

// New Post Submit
app.post(
       "/index/newpost/submit",
       upload.single("mainSchema[image]"),
       customerror(allList.newpostSabmit)
);

// Delete Post
app.get("/index/:id/deletepost", isLogin, customerror(allList.deletePost));

// Add Review
app.post("/index/:id/review", isLogin, customerror(allList.newReviewAdd));

// Delete Review
app.get(
       "/index/:id/review/:reviewid",
       isLogin,
       customerror(allList.reviewDelete)
);

// Signup
app.get("/signup", (req, res) => {
       res.render("sign_up_form");
});
app.post("/signup", customerror(sign.signup));

// Login
app.get("/login", (req, res) => {
       res.render("login_form");
});
app.post(
       "/login",
       storeReturnTo,
       passport.authenticate("local", {
              failureRedirect: "/login",
              failureFlash: true,
       }),
       log.login
);

// Logout
app.get("/logout", out.logout);

// ================== 404 Route ==================
app.use((req, res, next) => {
       next(new RoutingError(404, "Route not found, please try again!"));
});

// ================== Error Handler ==================
app.use((err, req, res, next) => {
       // Mongoose Validation Error
       if (err.name === "ValidationError") {
              const validationMsg =
                     err.errors?.price?.properties?.message || err.message;
              req.flash("error", validationMsg);
       }

       const url = req.originalUrl;

       if (url.includes("/newpost/submit")) {
              req.flash("error", err.message);
              return res.redirect("/index/newpost");
       }

       if (url.includes("/index/:id/review")) {
              const id = req.params?.id || req.body?.id || req.query?.id;
              if (!id) {
                     req.flash("error", "ID not found, please try again.");
                     return res.redirect("/index");
              }
              req.flash("error", err.message || "Something went wrong while adding review.");
              return res.redirect(`/index/${id}`);
       }

       req.flash("error", err.message || "Something went wrong!");
       return res.redirect("/index");
});

// ================== Server Start ==================
const port = process.env.PORT || 8080;
app.listen(port, () => {
       console.log(`✅ Server running on http://localhost:${port}`);
});



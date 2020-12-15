var express = require("express"), 
	mongoose = require("mongoose"), 
	passport = require("passport"), 
	bodyParser = require("body-parser"), 
	LocalStrategy = require("passport-local"), 
	passportLocalMongoose = 
		require("passport-local-mongoose"), 
	User = require("./routes/User"); 

mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@comp-20.yu1ib.mongodb.net/aniGen?retryWrites=true&w=majority"); 

var app = express(); 
app.set("view engine", "ejs", "html"); 
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require("express-session")({ 
	secret: "Rusty is a dog", 
	resave: false, 
	saveUninitialized: false
})); 


app.use(passport.initialize()); 
app.use(passport.session()); 


passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 


// Showing home page 
app.get("/", function (req, res) { 
	res.render("login"); 
}); 

app.get("/index", isLoggedIn, function (req, res) { 
	res.render("index"); 
}); 

// Showing register form 
app.get("/register", function (req, res) { 
	res.render("register"); 
}); 

app.get("/shows", function (req, res) { 
	res.render("shows"); 
}); 


app.get("/search", function (req, res) { 
	
	res.sendFile('..search.html', { root : views });
});

app.get("/saved", function (req, res) { 
	res.render("saved"); 
});
 
app.get("/index", function (req, res) { 
	res.render("index"); 
	
}); 


// Handling user signup 
app.post("/register", function (req, res) { 
	var username = req.body.username 
	var password = req.body.password 
	User.register(new User({ username: username }), 
			password, function (err, user) { 
		if (err) { 
			console.log(err); 
			return res.render("register"); 
		} 

		passport.authenticate("local")( 
			req, res, function () { 
			res.render("index"); 
		}); 
	}); 
}); 

//Showing login form 
app.get("/login", function (req, res) { 
	res.render("login"); 
}); 

//Handling user login 
app.post("/login", passport.authenticate("local", { 
	successRedirect: "/index", 
	failureRedirect: "/login"
}), function (req, res) { 
}); 

//Handling user logout 
app.get("/logout", function (req, res) { 
	req.logout(); 
	res.redirect("/login"); 
}); 

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
} 

var port = process.env.PORT || 3000; 
app.listen(port, function () { 
	console.log("Server Has Started!"); 
}); 

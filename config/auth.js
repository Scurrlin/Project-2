module.exports = function isLoggedIn(req, res, next){
	//passport gives us an isAuthenticated function 
	// to check if the reques is from an authenticated user
	if(req.isAuthenticated()) return next();

	// if not logged in, redirect them to our login route
	// to login!
	res.redirect('/auth/google')
}
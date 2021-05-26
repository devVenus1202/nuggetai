const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const Token = require('../models/token');
const config = require('../config/main');
const setUserInfo = require('../helpers/userHelper').setUserInfo;
const deleteUser = require('../helpers/userHelper').deleteUser;
const updateUser = require('../helpers/userHelper').updateUser;
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const { sendVerifyEmail, sendResetPasswordEmail, sendAccountDeletionEmail } = require('../helpers/sendgridHelper');

function generateToken(user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 604800 // in seconds
	});
}

function createAccessTokenFromUserEmail(user) {
	const payload = {
		uid: user._id,
		sub: user.email,
		key: crypto.randomBytes(16).toString('hex')
	};
	return jwt.sign(payload, config.secret, { expiresIn: '24h' });
}

function validateToken(token) {
	return jwt.verify(token, config.secret);
}

exports.signIn = async function(req, res, next) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		console.log(err);
		console.log(user);
		console.log(info);
		if (!user) {
			res.status(401).send({ success: false, error: info.error });
		} else {
			req.login(user, { session: false }, function(err) {
				if (err) {
					res.status(401).send({ success: false, error: info.error });
				} else {
					const userInfo = setUserInfo(user);
					res.status(200).json({
						token: `JWT ${generateToken(userInfo)}`,
						user: userInfo
					});
				}
			});
		}
	})(req, res, next);
};

exports.signUp = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const company = req.body.company;
	const industry = req.body.industry;
	const role = req.body.role;
	const company_type = req.body.company_type;
	const account_type = req.body.account_type;
	const image = req.body.image;

	if (!email) {
		return res.status(422).send({ error: 'You must enter an email address.' });
	}

	if (!password) {
		return res.status(422).send({ error: 'You must enter a password.' });
	}

	if (account_type === undefined) {
		return res.status(422).send({ error: 'account type error!' });
	}

	User.findOne({ email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		// If user is not unique, return error
		if (existingUser) {
			return res.status(422).send({ error: 'That email address is already in use.' });
		}

		// If email is unique and password was provided, create account
		const user = new User({
			email,
			password,
			firstname,
			lastname,
			company,
			industry,
			role,
			company_type,
			image,
			account_type
		});

		user.save((err, user) => {
			if (err) {
				return next(err);
			}
			const tokenEmail = createAccessTokenFromUserEmail(user);

			var token = new Token({
				_userId: user._id,
				token: tokenEmail
			});

			token.save(function(err) {
				if (err) {
					return res.status(500).send({ error: err.message });
				}
				sendVerifyEmail({ to: user.email, token: tokenEmail, name: user.firstname });
				const userInfo = setUserInfo(user);
				res.status(200).json({
					token: `JWT ${generateToken(userInfo)}`,
					user: userInfo
				});
			});
		});
	});
};

exports.sendVerifyMailAgain = function(req, res) {
	try {
		User.findOne({ email: req.body.email })
			.then((foundUser) => {
				let user = {
					_id: foundUser._id,
					email: foundUser.email
				};
				const tokenEmail = createAccessTokenFromUserEmail(user);

				var token = new Token({
					_userId: user._id,
					token: tokenEmail
				});

				token.save(function(err) {
					if (err) {
						return res.status(500).send({ error: err.message });
					}
					sendVerifyEmail({ to: user.email, token: tokenEmail, name: user.firstname });
					const userInfo = setUserInfo(user);
					res.status(200).json({
						success: true,
						message: 'success-mail-sent',
						user: user,
						tokenEmail: tokenEmail
					});
				});
			})
			.catch((err) => {
				res.status(404).send({ error: 'user not found' });
			});
	} catch (e) {
		res.status(404).json({ error: 'invalid-token' });
	}
};

exports.signOut = function(req, res) {
	req.logout();
	res.status(200).json({ message: 'Successfully logged out' });
};

exports.viewProfile = function(req, res) {
	const userInfo = setUserInfo(req.user);
	User.findOne({ email: req.user.email })
		.then((foundUser) => {
			res.status(200).json({
				success: true,
				user: setUserInfo(foundUser)
			});
		})
		.catch((err) => {
			res.status(404).send({ error: 'user not found' });
		});
};

exports.updateUser = async function(req, res) {
	const user = req.user;
	const { firstname, lastname, email, company, industry, company_type, role, image } = req.body;

	let updateData = {
		firstname,
		lastname,
		email,
		company,
		industry,
		role,
		company_type,
		image
	};

	const userResult = await updateUser(user._id, updateData);
	console.log(userResult);

	if (userResult) {
		res.status(200).json({
			success: true,
			msg: 'updated successfully'
		});
	} else {
		res.status(400).json({
			success: false,
			msg: 'user update failed'
		});
	}
};

exports.removeUser = async function(req, res) {
	const user = req.user;
	if (!user) {
		return res.status(404).json({
			error: 'user-no-exist'
		});
	}
	await deleteUser(user._id);
	sendAccountDeletionEmail({ to: user.email, name: user.firstname });
	res.status(200).json({
		success: true,
		msg: 'user deleted!'
	});
};

exports.sendPasswordReset = async function(req, res) {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return res.status(404).json({ error: 'user-no-exist' });
	}

	const token = createAccessTokenFromUserEmail(user);

	sendResetPasswordEmail({ to: user.email, token, name: user.firstname });

	res.status(200).json(user);
};

exports.changePassword = async function(req, res) {
	const user = req.user;
	if (!user) {
		return res.status(404).json({
			error: 'user-no-exist'
		});
	}

	if (!user) {
		return res.status(404).json({ message: 'user-no-exist' });
	}

	console.log(req.body.password, user.password);
	bcrypt.compare(req.body.password, user.password, function(err, result) {
		if (result == true) {
			user.password = req.body.newpassword;
			user.save(function(err) {
				res.status(200).json({
					message: 'password-reset-success'
				});
			});
		} else {
			return res.status(404).json({
				message: 'current-password-incorrect'
			});
		}
	});
};

exports.validateUser = async function(req, res) {
	// Find a matching token
	Token.findOne({ token: req.headers.authorization }, function(err, token) {
		if (!token) {
			return res.status(400).send({
				error: 'invalid-token'
			});
		}

		let decode;
		try {
			decode = validateToken(req.headers.authorization);
			console.log(decode);
		} catch (e) {
			res.status(404).json({ error: 'invalid-token' });
		}
		// If we found a token, find a matching user
		User.findOne({ _id: token._userId, email: decode.sub }, function(err, user) {
			if (!user) return res.status(400).send({ error: 'invalid-token' });
			if (user.isVerified) {
				return res.status(400).send({
					type: 'already-verified',
					error: 'already-verified.'
				});
			}
			// Verify and save the user
			user.isVerified = true;
			user.save(function(err) {
				if (err) {
					return res.status(500).send({ error: err.message });
				}
				const userInfo = setUserInfo(user);
				res.status(200).json({
					token: `JWT ${generateToken(userInfo)}`,
					user: user
				});
			});
		});
	});
};

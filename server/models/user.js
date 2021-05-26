const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    industry: {
      type: String,
    },
    role: {
      type: String,
    },
    company_type: {
      type: String,
    },
    image: {
      type: String,
    },
    account_type: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    challenges: {
      type: [Schema.Types.ObjectId],
      ref: 'Challenge',
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';

import { User } from '@/services/database';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password || '');

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_client_secret',
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        }

        user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || ''
        });

        await user.save();

        done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId: string, done) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return done(new Error('User not found'));
        }

        done(null, user);
    } catch (error) {
        done(error);
    }
});

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcrypt';
import cors from 'cors';

import '@/services/passport';
import { User, connectDB } from '@/services/database';
import { ensureAuthenticated } from '@/middlewares/auth';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_with_passportjs';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Connect to MongoDB
connectDB(MONGO_URI);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: FRONTEND_URL
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(422).json({ error: 'name, email and password are required' });
        }

        if (await User.findOne({ email })) {
            return res.status(409).json({ error: 'email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    passport.authenticate('local', (error: any, user: any, info: any) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        if (!user) {
            return res.status(401).json(info);
        }

        req.login(user, (error) => {
            if (error) {
                return res.status(500).json({ error: 'Something went wrong' });
            }

            return res.status(200).json({ id: user._id, name: user.name, email: user.email });
        });
    })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response) => {
    res.redirect(FRONTEND_URL);
});

app.get('/logout', (req: Request, res: Response) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        res.status(204).send();
    });
});

app.get('/me', ensureAuthenticated, (req: Request, res: Response) => {
    const user = req.user as any;
    res.json({ id: user._id, name: user.name, email: user.email });
});

app.listen(PORT, () => {
    console.log(`Backend server started on port ${PORT}`);
});

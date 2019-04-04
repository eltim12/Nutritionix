const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class UserController {
    static register(req, res) {
        const { name, email, password } = req.body

        User
            .create({ name, email, password })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }

    static login(req, res) {
        User
            .findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' })
                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)

                        res.status(200).json(token)
                    } else {
                        res.status(401).json({ message: 'Wrong password' })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }

    static verify(req, res) {
        let payload;
        let token;

        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,
            })
            .then(ticket => {
                payload = ticket.getPayload();
                const userid = payload['sub'];

                return User.findOne({ email: payload.email})
            })
            .then(user => {
                if (!user) {
                    return User.create({ name: payload.name, email: payload.email})
                } else {
                    return user
                }
            })
            .then(newUser => {
                token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET)
                
                res.status(200).json(token)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
}
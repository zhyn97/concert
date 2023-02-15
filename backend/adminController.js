import Admin from './admin.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

class AdminController {
    async addAdmin(req, res) {
        try {
            const { login, password } = req.body;
            const hash = await bcrypt.hash(password, 10)
            const admin = await Admin.create({
                login: login,
                password: hash
            });
            res.json(admin);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const admin = await Admin.find({ login });
            if(admin.length === 0) {
                res.status(401).json({ message: 'Incorrect username' });
                return;
            }
            const match = await bcrypt.compare(password, admin[0].password);
            if (match) {
                const token = jwt.sign({ id: admin[0]._id }, 'shhhhh', { expiresIn: '1h' });
                res.json({
                    admin: admin[0],
                    token: token
                });
            } else {
                res.status(401).json({ message: 'Incorrect password', });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new AdminController();
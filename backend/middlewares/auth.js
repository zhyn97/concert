import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
        payload = jwt.verify(token, 'shhhhh');
    } catch (err) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }

    req.user = payload; // записываем пейлоуд в объект запроса

    next(); // пропускаем запрос дальше
}

export default auth;
import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds format for 15days
        httpOnly: true, //prevent XSS attacks 
        sameSite: 'strict' //CSRF attack cross-site request forgery attacks
    });
}

export default generateTokenAndSetCookie;
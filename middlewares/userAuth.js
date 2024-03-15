import jwt from 'jsonwebtoken';


const protect = async (req,res,next) => {
    

    let {token} = req.headers;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY )

            if (decoded && (!decoded.role || decoded.role != 'user')) {
                return res.status(401).json({ error: 'Not authorized, invalid token' });
            }
            else{
                next()
            }

        } catch (error) {
            return res.status(401).json({ error: 'Not authorized, invalid token' });
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, invalid token' });
    }
};

export { protect };
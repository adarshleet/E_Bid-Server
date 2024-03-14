import jwt from "jsonwebtoken"

export const createJwt = (userId, role) => {
    const jwtKey = process.env.JWT_KEY
    if (jwtKey) {
        const token = jwt.sign(
            { id: userId, role: role },
            jwtKey
        );
        return token
    }
    throw new Error("JWT_KEY is not defined");
}



import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    //json webtoken consists of 3 parts,header,payload,signature.
    //header is metadata ,payload is the data,signature is used to verify if data is tampored or not

    //jwt has function called sign that will create token it takes two parameters, payload and signature
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    // set the token that we've created as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24
    })
}
export default generateToken;
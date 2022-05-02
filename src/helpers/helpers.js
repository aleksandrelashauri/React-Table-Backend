const signature = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
exports.check_token = async (req, res, next) => {
    const {usertoken} = req.headers
    try {
        if (!usertoken) {
            return  res.status(400).send({message: 'token is required!'})
        }
        const decoded = jwt.verify(usertoken, signature);
        console.log(decoded, "access token value")
        if (!decoded.data) {
            return  res.status(400).send({message: 'token is not valid!'})
        }
        req.user=decoded.data
     next()
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}
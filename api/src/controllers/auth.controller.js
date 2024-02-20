'use strict' 

class AuthController {
    register = async(req, res, next) => {
        try {
            const { username, email, password } = req.body
    
            const salt = await bcrypt.genSalt(10)
            const hashed_password = await bcrypt.hash(password, salt)
    
            const new_user = new User({
                username: username,
                email: email,
                password: hashed_password
            })
    
            const user = await new_user.save()
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    login = async(req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            !user && res.status(404).json({
                message: "Not found user!"
            })
    
            const valid_password = await bcrypt.compare(req.body.password, user.password)
            !valid_password && res.status(400).json({
                message: "Wrong password!"
            })
    
            return res.status(200).json({
                info: user
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = new AuthController()
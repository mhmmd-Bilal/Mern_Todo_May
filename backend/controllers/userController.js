import Users from "../Model/userModel.js";

const registerUser = async (req, res) => {

    let {name,email,password} = req.body

    const userExists = await Users.findOne({email : email})

    if(userExists){
        return res.status(400).json({message : 'user already exists'})
    }

    const user = await Users.create({
        name,
        email,
        password
    })

    if(user){
        return res.status(201).json(user)
    }else{
          return res.status(400).json({message : 'invalid user data'})
    }

};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

export { registerUser, loginUser, logoutUser };

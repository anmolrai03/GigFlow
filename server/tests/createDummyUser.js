import User from '../models/UserModel.js'


const createUser = async () => {
  const user = await User.create({
    name: "AdminTestUser",
    email: "admintestuser@gmail.com",
    password: "testpassword"
  })

  console.log('User created', user);
}

export default createUser;
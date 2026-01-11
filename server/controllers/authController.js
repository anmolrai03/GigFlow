const registerController = async (req , res) => {
  res.end("Register route working");
}

const loginController = async (req , res) => {
  res.end("Login route working");
}

const logoutController = async (req , res) => {
  res.end("Logout route is working");
}

export {registerController , loginController , logoutController};
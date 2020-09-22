
// pseudo authentication for now

const auth = (req, res, next) => {
  if(!req.auth){
    next();
  }
  else{
    res.status(401).json({msg: "User Not Authenicated"})
  }
}

module.exports = auth;

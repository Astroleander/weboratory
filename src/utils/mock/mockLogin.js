const mockLogin = ({ name, pwd }) => {
  console.log(name, pwd)
  return new Promise((resolve, reject) => {
    if ((name === "admin", pwd === "admin"))
      setTimeout(() => resolve({
        info: { name: "admin", pwd: "admin" }
      }), 2000);
    else setTimeout(() => reject({ message: "dismatched!" }), 2000);
  });
};
export default mockLogin;

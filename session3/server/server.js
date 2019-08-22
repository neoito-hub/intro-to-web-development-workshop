const config = require("./config");
const app = require("./app");

app.listen(config["PORT"], err => {
  if (err) {
    console.log(`-> server err ${err}`);
  }

  console.log(`-> server running on port ${config["PORT"]}`);
});

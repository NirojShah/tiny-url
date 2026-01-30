const http = require("http");
const app = require("./app");
const envSelector = require("./envronment_config");
const { default: mongoose } = require("mongoose");

envSelector();
const server = http.createServer(app);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("DB connected.");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};
server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  connectDB()
  console.log("server started.." + process.env.PORT);
});

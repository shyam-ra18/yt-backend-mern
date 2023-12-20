import "dotenv/config";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`❌ Error: ${error}`);
      throw error;
    });
    app.listen(port, () => {
      console.log(`⚙️  Server is running at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("❗Mongodb connection Failed: ", err);
  });

import app from "./app.js";
import {validENV} from "./schemas/envSchema"

app.listen(validENV.PORT || 3001, () => {
  console.log(`App is serving at port ${process.env.PORT}, http://localhost:${validENV.PORT || 3001}/health`);
});

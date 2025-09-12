import app from "./app.js";

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is serving at port ${process.env.PORT}, http://localhost:${process.env.PORT || 4000}/health`);
});

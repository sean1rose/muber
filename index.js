const app = require('./app');

const port = 3050;

app.listen(port, () => {
  console.log(`server is litty on port ${port}`);
});
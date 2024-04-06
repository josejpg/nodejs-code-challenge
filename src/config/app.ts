import express from 'express';
import json from 'body-parser';

const app = express();

app.use(json.urlencoded({
  extended: true
}));
app.use(json.json());

export default app;

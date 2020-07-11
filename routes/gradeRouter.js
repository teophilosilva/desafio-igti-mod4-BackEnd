import express from 'express';
import controller from '../controllers/gradeController.js';

const app = express();

app.post('/grade/', controller.create);
app.get('/grade/:name', controller.findName);
app.get('/grade/', controller.findAll);
app.get('/grade/name/:id', controller.findById);
app.put('/grade/:id', controller.update);
app.delete('/grade/:id', controller.remove);
app.delete('/grade/', controller.removeAll);

export { app as gradeRouter };

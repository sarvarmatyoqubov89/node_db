const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

// const courses = [
//     {id: 1, name: 'courses1'},
//     {id: 2, name: 'courses2'},
//     {id: 3, name: 'courses3'},
// ];

app.get('/', (req, res)=>{
    res.send('Hello world!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            //email: Joi.string().email({tlds:{allow: false}}).required(),
        }
    );
    
    const validation = schema.validate(req.body);
    if (validation.error) return res.status(400).send(validation.error.message);
    res.send(validation.value);
    
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found');
    
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            //email: Joi.string().email({tlds:{allow: false}}).required(),
        }
    );

    const validation = schema.validate(req.body);
    if (validation.error) return res.status(400).send(validation.error.message);
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return validateCourse(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port} ...`));
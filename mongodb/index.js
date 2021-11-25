const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongodb');


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

//ex_1
// async function getCourses(){
//     return await Course
//     .find({isPublished: true, tags: 'backend'})
//     .sort({name: 1})
//     .select({name: 1, author: 1});
// }

//ex_2
// async function getCourses(){
//     return await Course
//     .find({isPublished: true})
//     .or([{tags: 'frontend'}, {tags: 'backend'}])
//     .sort('-price')
//     .select('name author price');
// }

//ex_3
async function getCourses(){
    return await Course
    .find({isPublished: true})
    .or([
        {price: {$gte: 15}},
        {name: /.*by.*/i}
    ])
    .sort('-price')
    .select('name author price');
}


async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();

const express = require('express');
const data = require('../data.json');
const router = express.Router();

const ALL_COURSES = "ALL_COURSES"
const ALL_LEVEL = "ALL_LEVEL"
const DEFAULT_COURSES = ['Medical', 'Dental', 'Ayurveda'];
const DEFAULT_LEVELS = ['UG', 'PG', 'DIPLOMA', 'Ph.D'];
let selFeeType = "";
let selNationality = "";
let selCourse = "";
let selLevel = "";
let newLevel = [];
let newCourse = [];

router.get('/fillFeeTypes', (req, res, next) => {
    res.status(200).send(data);
});

router.get('/fillNationality', (req, res, next) => {
    const { feetype } = req.query;
    selFeeType = feetype;
    const nationalities = Object.keys(data[feetype]);
    res.status(200).send(nationalities);
});

router.get('/fillCourses', (req, res, next) => {
    const { nationality } = req.query;
    selNationality = nationality;
    const courses = Object.keys(data[selFeeType][selNationality]);
    newCourse=[];
    courses.forEach(course => {
        if (course === ALL_COURSES) {
            DEFAULT_COURSES.forEach(co => {
                newCourse.push(co);
            });
        } else {
            newCourse.push(course);
        }
        res.status(200).send(newCourse.length > 1 ? newCourse : DEFAULT_COURSES);
    })
});

router.get('/fillLevels', (req, res, next) => {
    const { course } = req.query;
    DEFAULT_COURSES.includes(course) && !newCourse.includes(course) ? selCourse = course : selCourse = ALL_COURSES;
    const levels = Object.keys(data[selFeeType][selNationality][selCourse]);
    newLevel=[];
    levels.forEach(level => {
            newLevel.push(level);
    });
    res.status(200).send(newLevel.length > 1 ? newLevel : DEFAULT_LEVELS);
});

router.get('/finalFees', (req, res, next) => {
    const { level } = req.query;
    DEFAULT_LEVELS.includes(level) && !newLevel.includes(level) ? selLevel = ALL_LEVEL : selLevel = level;
    const fee = data[selFeeType][selNationality][selCourse][selLevel].amount;
    res.send(fee.toString());
});


module.exports = router;

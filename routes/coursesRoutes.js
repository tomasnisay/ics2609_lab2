const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/coursesController');

router.get('/', ctrl.getCourses);          // GET /api/courses
router.get('/:id', ctrl.getCourseById);    // GET /api/courses/:id
router.post('/', ctrl.createCourse);       // POST /api/courses
router.put('/:id', ctrl.updateCourse);     // PUT /api/courses/:id
router.delete('/:id', ctrl.deleteCourse);  // DELETE /api/courses/:id

module.exports = router;
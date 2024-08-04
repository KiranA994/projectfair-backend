// import express
const express = require('express')

// import userController
const userController = require('./controllers/userController')

const projectController = require('./controllers/projectController')

const jwtMiddleware = require('./middleware/jwtMiddleware')

const multerConfig = require('./middleware/multerMiddleware')

// to create router - use class Router in express library
const router = new express.Router()

// path to resolve register request
router.post('/user/register',userController.register) 

//  path to resolve login request
router.post('/user/login',userController.login)

// path to add a project
router.post('/projects', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)

// path to get all projects
router.get('/all-project',projectController.getAllProject)

// path to get three projects (home page)
router.get('/home-project',projectController.getProject)

//  path to get user project
router.get('/user/all-project',jwtMiddleware, projectController.getUserProject)

// path to delete a project
router.delete('/delete-project/:id',jwtMiddleware,projectController.deleteProject)

// path to update a project
router.put('/update-project/:id', jwtMiddleware, multerConfig.single('projectImage'), projectController.updateProject)

// path to update the user profile
router.put('/update-profile',jwtMiddleware,multerConfig.single('profile'),userController.updateProfile)
// export router
module.exports = router
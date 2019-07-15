const express = require('express');
const router = require('express').Router();
const dbProjects = require('./projectModel');


router.use(express.json());



router.get('/', (req, res) =>{
    dbProjects.get()
    .then(projects =>{
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/:id', validateProject, (req, res) =>{
    const {id} = req.params;
    dbProjects.get(id)
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', (req, res) =>{
    const {name, description} = req.body; 
    if(!name || !description){
        res.status(400).json({message:"please provide a name and description"})
    }else{
        dbProjects.insert(req.body)
        .then(newProject =>{
            res.status(201).json(newProject);
        })
        .catch(error => {
            res.status(500).json({error:`There was an issue with adding project`,  error})
        })
    }
});

router.put('/:id', validateProject, (req, res) =>{
    const {id} = req.params;
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({message:"please provide a name and description"})
    }else{
        dbProjects.update(id, req.body)
        .then(changed =>{
            res.status(204).json(changed);
        })
        .catch(error => {
            res.status(500).json({error:`There was an issue with updating`, error})
        })
    }
});

router.delete('/:id', validateProject, (req, res)=>{
    const {id} = req.params;
    dbProjects.remove(id)
    .then(removed =>{
        res.status(400).json({message:`You have removed project ${id}`});
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/:id/actions', validateProject, (req, res) =>{

    const {id} = req.params;
    dbProjects.getProjectActions(id)
    .then(actions =>{
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json(error)
    })
});


function validateProject(req, res, next){
    const {id} = req.params;
        dbProjects.get(id)
        .then(project =>{
            if(project){
                next()
            }else{
                res.status(404).json({error: "This project does not exist"})
            }
        })
}

module.exports = router;
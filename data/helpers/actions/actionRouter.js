const express = require('express');
const router = express.Router();
const dbActions = require('./actionModel');
const dbProjects = require('../projects/projectModel');


router.use(express.json());



router.get('/:id/actions/:action_id', (req, res) =>{
    const {action_id} = req.params;
    dbActions.get(action_id)
    .then(actions =>{
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/:id/actions', projectExist,(req, res) =>{
    const {id} = req.params;
    const {description, notes} = req.body;
    if(!description || ! notes){
        res.status(400).json({message:"please add a description and a brief note"})
    }else{
        const newAction = {
            "project_id":id,
            "description": description,
            "notes":notes
        }
        dbActions.insert(newAction)
        .then(action =>{
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json(error)
        })
    }
})

router.put('/:id/actions/:action_id', (req, res) =>{
    const {id} = req.params;
    const {action_id} = req.params;
    const {description, notes} = req.body;
    
    if(!description || ! notes){
        res.status(400).json({message:"please add a description and a brief note"})
    }else{
        const newAction = {
            "project_id":id,
            "description": description,
            "notes":notes
        }

        dbActions.update(action_id, newAction)
        .then(updated =>{
            res.status(204).json(updated);
        })
        .catch(error => {
            res.status(500).json(error)
        })
    }

});

router.delete('/:id/actions/:action_id', (req, res) =>{
    const {id} = req.params;
    const {action_id} = req.params;

        dbActions.remove(action_id)
        .then(removed =>{
            res.status(400).json({message: `you have successfully deleted action #${action_id}`});
        })
        .catch(error => {
            res.status(500).json(error)
        })

});

function projectExist(req, res, next){
    const {id} = req.params;
    dbProjects.get(id)
    .then(project =>{
        if(project){
            next()
        }else{
            res.status(400).json({message:"sorry this project doesnt exist"})
        }
        
    })
}

module.exports = router;
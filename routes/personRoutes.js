const router = require('express').Router()

const Person = require('../models/Person')


//Create - criacao de dados
router.post('/', async (req, res)=>{

    // req.body
    //{name: "Paulo", salary: 5000, approved: false}
    const{name, salary, approved} = req.body

    if(!name){
        res.status(442).json({error: 'O nome e obrigatorio'})
        return
    }

    const person = {
        name,
        salary,
        approved
    }
    
    try{
        //criando dados
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})


// Read - leitura de dados

router.get('/', async (req, res) =>{
    try{

        const people =  await Person.find()

        res.status(200).json(people)

    }catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    //extrair o dado da requisicao
    const id = req.params.id

    try{

        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(442).json({message: "Usuario nao encontrado"})
            return
        }

        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error: error})
    }
})

// Update - atualizacao de dados (PUT, PATCH)

router.patch('/:id', async(req, res)=>{
    const id = req.params.id

    const{name, salary, approved} = req.body

    const person ={
        name, 
        salary, 
        approved
    }

    try{

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0 ){
            res.status(442).json({message: "Usuario nao encontrado"})
            return
        }

        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})

// Delete - deletar dados

router.delete('/:id', async(req, res)=>{

    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(442).json({message: "Usuario nao encontrado"})
        return
    }

    try{
        await Person.deleteOne({_id: id})
    
        res.status(200).json({message : 'Usuario deletado com sucesso'})
    }catch(error){
        res.status(500).json({error: error})
    }

})

module.exports = router
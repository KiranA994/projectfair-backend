const products = require('../model/projectSchema')

exports.addProject = async(req,res) =>{
    console.log('inside add request');
    // fetching the userId from payload key
    console.log(req.payload);

    const userid = req.payload
    const projectImage = req.file.filename

    const {title,language,github,website,overview} = req.body
    
    console.log(title,language,github,website,overview);

    try{
        const existingProject = await products.findOne({github})

        if(existingProject){
            res.status(400).json('Already Exists')
        }
        else{
            const newProject = new products({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId: userid
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(error){
        res.status(401).json(`requested due to ${error}`)
    }
}

exports.getAllProject = async(req,res) => {
    const searchkey = req.query.search;
    console.log(searchkey);
try{
    const query = {
        language: {
            // $options:'i' to remove case sensitivity
            $regex: searchkey,$options:'i'
        }
    }
const allProject = await products.find(query)
res.status(200).json(allProject)
}
catch(error){
    res.status(401).json(`requested due to ${error}`)
}
}

exports.getProject = async(req,res) => {
    try{
        const allProject = await products.find().limit(3)
        res.status(200).json(allProject)
        }
        catch(error){
            res.status(401).json(`requested due to ${error}`)
        }
}

exports.getUserProject = async(req,res) => {
    const userId = req.payload
    console.log(userId);
    try{
        const allUserProject = await products.find({userId})
        console.log(allUserProject);
        res.status(200).json(allUserProject)
    }
    catch(error){
        res.status(401).json(`requested due to ${error}`)
    }
}

exports.deleteProject = async(req,res) => {
    console.log(req);
    const {id} = req.params
    try{
        const result = await products.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    }
    catch(error){
        res.status(401).json(`requested due to ${error}`)
    }
}

exports.updateProject = async(req,res) => {
    const {id} = req.params
    const {title,language,github,website,overview,projectImage} = req.body

    const uploadImage = req.file ? req.file.filename : projectImage
    
    try{
        const result = await products.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadImage},{new:true})
        await result.save()
        res.status(200).json(result)
    }
    catch(error){
        res.status(401).json(`requested due to ${error}`)
    }
}
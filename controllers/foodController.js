import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// display/list food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.send({ success: true, data: foods })
    } catch (error) {
        console.log("error: ", error)
        res.json({ success: false, message: "Error" })
    }
}

// delete particular food item 
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.send({ success: true, message: "food removed" })
    } catch (error) {
        console.log("Error: ", error)
        res.send({ success: false, message: "Error" })
    }
}

export { addFood, listFood, removeFood }
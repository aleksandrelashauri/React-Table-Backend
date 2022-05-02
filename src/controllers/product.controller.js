const Product = require('../models/product.model.js');
const User = require('../models/user.model.js');

exports.health_check = (req, res) => {
    try {
        return res.status(200).send({message: "hello"});
        
    } catch (error) {
        console.log("error",error)
        return res.status(500).send({message: error.message})
    }
};
exports.get_products = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).send({message: "ok", data: {
                products
            }});
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
};
exports.add_products = async (req, res) => {
    try {
        const {
            name,
            mpns,
            category,
            manufacturer,
            type,
            available
        } = req.body
        const { user } = req
        const product = new Product({
            name,
            mpns,
            category,
            manufacturer,
            available,
            type,
            owner:user.id
        });
        const newProduct = await product.save()
        await User.update(
            { _id: user.id },
            { $push: { owner: newProduct._id.toString() } }
          )
        return res.status(200).send({message: "ok", data: {
                newProduct
            }});
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
};
exports.products_details = async (req, res) =>{
    try{
     const product = await Product.findById(
      {_id: req.params.id})
      return res.status(200).send({
        message: "OK",
        data: {product}
      })
    }catch(error){
      return res.status(500).send({ message: error.message });
    }
};
exports.update_products = async (req, res) => {
    try {
        const {id} = req.params
        const updatedProduct = await Product.findOneAndUpdate({
            _id: id,
        }, {$set: req.body},
        {new:true}
        )
        return res.status(200).send({message: "OK", data: {
                updatedProduct
            }})
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};
exports.delete_products = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
            _id: req.params.id
        }, {$set: req.body})
        return res.status(200).send({message: "OK", data: {
                deletedProduct
            }})
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
};

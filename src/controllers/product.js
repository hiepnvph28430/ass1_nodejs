import Joi from "joi";
import Product from "../models/product";

const productShema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number()
})

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.json(products)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const get = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.json(product)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const create = async function (req, res) {
    try {
        const { error } = productShema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const product = await Product.create(req.body)
        if (!product) {
            return res.json({
                message: "Thêm thất bại"
            })
        }
        return res.json({
            message: "Thêm thành công",
            data: product
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const update = async function (req, res) {
    try {
        const { error } = productShema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const product = await Product.updateOne({ _id: req.params.id }, req.body)
        if (!product) {
            return res.json({
                message: "Cập nhật không thành công"
            })
        }
        return res.json({
            message: "Cập nhật thành công",

        })

    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const remove = async function (req, res) {
    try {
        await Product.deleteOne({ _id: req.params.id })
        return res.json({
            message: "Xóa thành công"
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }

}
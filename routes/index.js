var express = require("express");
var router = express.Router();
import models from '../models/index';
import {
    twilio
} from '../config/credentials'
import {
    successResponse,
    errorResponse
} from '../modules/common'

router.get("/", function (req, res, next) {
    successResponse(res, "Welcome to ZaHu Boilerplate")
})

/* GET home page. */
router.get("/create", async function (req, res, next) {
    try {
        await models.User.create({
            username: "NewDon",
            email: "my@gamil.com",
            first_name: "Rocky",
            last_name: "KGF",
            password: "12345678",
            salt: "12131"
        }).then(user => {
            // console.log(user)
            return models.Product.create({
                name: "NewPro",
                price: "121212"
            }).then(product => {
                // console.log(product)
                return models.Store.create({
                    name: "Saravana",
                    slog: "New Store"
                }).then(store => {
                    // console.log(store)
                    return user.addProduct(product).then(() => {
                        return store.addProduct(product).then(() => {
                            return user.addStore(store, {
                                through: {
                                    role: 'manager'
                                }
                            }).then(() => {
                                return user.hasProduct(product).then((result) => {
                                    successResponse(res, result)
                                })
                            })
                        })
                    })
                })
            })
        })
    } catch (err) {
        errorResponse(res, err)
    }
});


router.get("/getall", async function (req, res, next) {
    var getAll = await models.User.findAll({
        include: [{
            model: models.Store,
            include: [{
                model: models.Product
            }]
        }, {
            model: models.Product
        }]
    })
    successResponse(res, getAll)
});




module.exports = router;
'use strict';

const Joi = require('joi');

exports.register = function(server, options, next) {
    const db = server.app.db;

    //Checking whether routes are working
    server.route({
        method: "GET",
        path: "/check",
        handler: (req, res) => {
            res("Routes working!");
        }
    })

    //Route to get product by code
    server.route({
        method: "GET",
        path: "/code/{product_code}",
        handler: (req, res) => {
            const product_code = encodeURIComponent(req.params.product_code);
            db.query("SELECT * FROM `product_details` WHERE `product_code` = '" + product_code + "'", function (error, result, fields) {
                if (error) {
                    console.log("Error while querying");
                    throw error;
                }
                console.log("Result from get product_code function", result);
                var product = JSON.stringify(result)
                res(product);
            });
        },
        //validations for req.params
        config: {
            validate: {
                params: {
                    product_code: Joi.string()
                }
            }
        }
    });

    //route to get product by name
    server.route({
        method: "GET",
        path: "/name/{product_name}",
        handler: (req, res) => {
            const product_name = encodeURIComponent(req.params.product_name);
            db.query("SELECT * FROM `product_details` WHERE `product_name` = '" + product_name + "'", function (error, result, fields) {
                if (error) {
                    console.log("Error while querying");
                    throw error;
                }
                console.log("Result from get product_name function", result);
                var product = JSON.stringify(result)
                res(product);
            });
            //validations for req.params
            config: {
                validate: {
                    params: {
                        product_name: Joi.string()
                    }
                }
            }
        }
    });

    //route to get all products
    server.route({
        method: "GET",
        path: "/products",
        handler: (req, res) => {
            var statement = "SELECT * FROM `product_details`";
            var products;
            db.query(statement , function (error, result, fields) {
                if (error) {
                    console.log("Error while querying");
                    throw error; 
                }
                console.log("Result from get all products function", result);
                products = JSON.stringify(result);
                res(products);
                });
        }
    });

    //route to add new product
    server.route({
        method: "POST",
        path: "/product",
        handler: (req, res) => {
            const product_code = encodeURIComponent(req.payload.product_code);
            const product_name = encodeURIComponent(req.payload.product_name);
            const product_price = encodeURIComponent(req.payload.product_price);
            const product_gst = encodeURIComponent(req.payload.product_gst);
            var statement = "INSERT INTO `product_details` VALUES ('" + product_code + "', '" + product_name + "', '" + product_price + "', '" + product_gst + "')";
            db.query(statement, function (error, result, fields) {
                if (error) {
                    console.log("Error while querying");
                    throw error;
                }
                console.log("Result from query function", result);
                res(result);
            });
        },
        //validations for req.payload
        config: {
            validate: {
                payload: {
                    product_code: Joi.string(),
                    product_name: Joi.string(),
                    product_price: Joi.number().integer(),
                    product_gst: Joi.number()
                }
            }
        }
    });

    //route to edit a product
    server.route({
        method: "POST",
        path: "/edit/{product_code}",
        handler: (req, res) => {
            const product_code = encodeURIComponent(req.params.product_code);
            const product_price = encodeURIComponent(req.payload.product_price);
            const product_gst = encodeURIComponent(req.payload.product_gst);
            var statement = "UPDATE `product_details` SET `product_price` = '" + product_price + "', `product_gst` = '" + product_gst + 
                "' WHERE `product_details`.`product_code` = '" + product_code + "'";
            db.query(statement, function (error, result, fields) {
                if (error) {
                    console.log("Error while querying");
                    throw error;
                }
                console.log("Result from Update query function", result);
                res(result);
            });
        },
        //validations for payload
        config: {
            validate: {
                payload: {
                    product_code: Joi.string(),
                    product_price: Joi.number().integer(),
                    product_gst: Joi.number()
                }
            }
        }
    });
  

    return next();
};

exports.register.attributes = {  
  name: 'routes-products'
};
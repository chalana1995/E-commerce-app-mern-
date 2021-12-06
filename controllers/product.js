const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploded",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;

    if (!name | !description | !price | !category | !quantity | !shipping) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const product = new Product(fields);

    if (files.photo) {
      if (files.photo.size < 2000000) {
        return res.status(400).json({
          error: "image should be less than 2mb in size",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

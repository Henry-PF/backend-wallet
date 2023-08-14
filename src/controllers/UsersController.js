//const {} = require("../db");
const { Op } = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const Sequelize = require("sequelize");

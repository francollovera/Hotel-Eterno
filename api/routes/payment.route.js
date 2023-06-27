const express = require('express');
const router = express.Router();
const {createSession,createCustumer,paymentStatus} = require("../controllers/controllerPayment") ;


router.post("/checkout", createSession);
router.post("/custumer", createCustumer);
router.post("/status", paymentStatus);

module.exports=router;
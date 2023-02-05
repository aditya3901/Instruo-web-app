const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Paytm = require('paytm-pg-node-sdk');
const crypto = require("crypto")

exports.createTransactionToken = asyncHandler(async (req, res, next) => {
    var paymentDetails = {
        amount: req.body.amount,
        customerId: req.body.userId,
        customerEmail: req.body.email,
        customerPhone: req.body.phone,
        customerName: req.body.name,
    };

    if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone || !paymentDetails.customerName) {
        return next(new AppError("Failed To Create Transaction Token", 400));
    } 

    var channelId = Paytm.EChannelId.WEB;
    var orderId = crypto.randomBytes(16).toString("hex");
    var txnAmount = Paytm.Money.constructWithCurrencyAndValue(Paytm.EnumCurrency.INR, paymentDetails.amount);
    var userInfo = new Paytm.UserInfo(paymentDetails.customerId); 
    userInfo.setEmail(paymentDetails.customerEmail);
    userInfo.setFirstName(paymentDetails.customerName);
    userInfo.setMobile(paymentDetails.customerPhone);
    var paymentDetailBuilder = new Paytm.PaymentDetailBuilder(channelId, orderId, txnAmount, userInfo);
    var paymentDetail = paymentDetailBuilder.build();
    var response = Paytm.Payment.createTxnToken(paymentDetail);

    res.status(201).json({
        status: "success",
        txnToken: response.responseObject.body.txnToken,
        orderId: orderId,
        message: "Transaction Token Created."
    });
})

exports.getPaymentStatus = asyncHandler(async (req, res, next) => {
    var orderId = req.body.orderId;
    
    if (!orderId) {
        return next(new AppError("Order Id Required", 400));
    }

    var readTimeout = 80000;
    var paymentStatusDetailBuilder = new Paytm.PaymentStatusDetailBuilder(orderId);
    var paymentStatusDetail = paymentStatusDetailBuilder.setReadTimeout(readTimeout).build();
    var response = Paytm.Payment.getPaymentStatus(paymentStatusDetail);

    if (response.responseObject.body.resultInfo.resultStatus == "TXN_SUCCESS") {
        res.status(201).json({
            status: "success",
            message: "Transaction Successful",
            paymentStatus: response
        })
    }

    else {
        res.status(201).json({
            status: "success",
            message: "Transaction Failed",
            paymentStatus: response
        }) 
    }
})
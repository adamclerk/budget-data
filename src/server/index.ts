"use strict";

export const runServer = () => {
  var util = require("util");
  var sigint = require("sigint").create();
  const open = require('open');

  const os = require("os");
  const dotenv = require("dotenv");
  const path = require("path");
  const envPath = path.resolve(os.homedir(), ".plaid/.env");
  dotenv.config({ path: envPath });

  var envvar = require("envvar");
  var express = require("express");
  var bodyParser = require("body-parser");
  var moment = require("moment");
  var plaid = require("plaid");
  var fs = require("fs");
  var mkdirp = require("mkdirp");

  var APP_PORT = envvar.number("APP_PORT", 8000);
  var PLAID_CLIENT_ID = envvar.string("PLAID_CLIENT_ID");
  var PLAID_SECRET = envvar.string("PLAID_SECRET");
  var PLAID_PUBLIC_KEY = envvar.string("PLAID_PUBLIC_KEY");
  var PLAID_ENV = envvar.string("PLAID_ENV", "sandbox");
  var PLAID_USER_LEGAL_NAME = envvar.string("PLAID_USER_LEGAL_NAME");
  var PLAID_USER_EMAIL_ADDRESS = envvar.string("PLAID_USER_EMAIL_ADDRESS");

  // PLAID_PRODUCTS is a comma-separated list of products to use when initializing
  // Link. Note that this list must contain 'assets' in order for the app to be
  // able to create and retrieve asset reports.
  var PLAID_PRODUCTS = envvar.string("PLAID_PRODUCTS", "transactions");

  // PLAID_PRODUCTS is a comma-separated list of countries for which users
  // will be able to select institutions from.
  var PLAID_COUNTRY_CODES = envvar.string(
    "PLAID_COUNTRY_CODES",
    "US,CA,GB,FR,ES"
  );

  // We store the access_token in memory - in production, store it in a secure
  // persistent data store
  var ACCESS_TOKEN: string = "";
  var PUBLIC_TOKEN: string = "";
  var ITEM_ID = null;

  // Initialize the Plaid client
  // Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
  var client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
    { version: "2019-05-29", clientApp: "Plaid Quickstart" }
  );

  var app = express();
  app.use(express.static("src/server/public"));
  app.set("view engine", "ejs");
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  app.get("/", function(request: any, response: any, next: any) {
    mkdirp.sync(`${os.homedir()}/.plaid/accounts`);
    mkdirp.sync(`${os.homedir()}/.plaid/transactions`);
    response.render(__dirname + "/views/index.ejs", {
      PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
      PLAID_ENV: PLAID_ENV,
      PLAID_PRODUCTS: PLAID_PRODUCTS,
      PLAID_COUNTRY_CODES: PLAID_COUNTRY_CODES,
      PLAID_USER_LEGAL_NAME: PLAID_USER_LEGAL_NAME,
      PLAID_USER_EMAIL_ADDRESS: PLAID_USER_EMAIL_ADDRESS
    });
  });

  // Exchange token flow - exchange a Link public_token for
  // an API access_token
  // https://plaid.com/docs/#exchange-token-flow
  app.post("/get_access_token", function(
    request: any,
    response: any,
    next: any
  ) {
    PUBLIC_TOKEN = request.body.public_token;
    var payload = JSON.parse(request.body.payload);
    client.exchangePublicToken(PUBLIC_TOKEN, function(
      error: any,
      tokenResponse: any
    ) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      // prettyPrintResponse(tokenResponse);
      fs.writeFileSync(
        `${os.homedir()}/.plaid/accounts/${PUBLIC_TOKEN}.json`,
        JSON.stringify({ payload, tokenResponse }, null, "  ")
      );

      response.json({
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
        error: null
      });
    });
  });

  // Retrieve Transactions for an Item
  // https://plaid.com/docs/#transactions
  app.get("/transactions", function(request: any, response: any, next: any) {
    // Pull transactions for the Item for the last 30 days
    var startDate = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    var endDate = moment().format("YYYY-MM-DD");
    client.getTransactions(
      ACCESS_TOKEN,
      startDate,
      endDate,
      {
        count: 250,
        offset: 0
      },
      function(error: any, transactionsResponse: any) {
        if (error != null) {
          prettyPrintResponse(error);
          return response.json({
            error: error
          });
        } else {
          prettyPrintResponse(transactionsResponse);
          response.json({ error: null, transactions: transactionsResponse });
        }
      }
    );
  });

  // Retrieve Identity for an Item
  // https://plaid.com/docs/#identity
  app.get("/identity", function(request: any, response: any, next: any) {
    client.getIdentity(ACCESS_TOKEN, function(
      error: any,
      identityResponse: any
    ) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      }
      prettyPrintResponse(identityResponse);
      response.json({ error: null, identity: identityResponse });
    });
  });

  var prettyPrintResponse = (response: any) => {
    console.log(util.inspect(response, { colors: true, depth: 4 }));
  };

  app.post("/set_access_token", function(
    request: any,
    response: any,
    next: any
  ) {
    ACCESS_TOKEN = request.body.access_token;
    client.getItem(ACCESS_TOKEN, function(error: any, itemResponse: any) {
      response.json({
        item_id: itemResponse.item.item_id,
        error: false
      });
    });
  });

  const server = app.listen(APP_PORT, function() {
    console.log("login request server listening on port " + APP_PORT);
    console.log("press any key when done");
    open(`http://localhost:${APP_PORT}`);
    process.stdin.once('data', function () {
      console.log('closing server');
      server.close();
      process.exit();
      // continueDoingStuff();
    });
    // sigint.on("keyboard", function() {
    //   console.log('closing server');
    //   server.close();
    //   process.exit();
    // });
  });
};

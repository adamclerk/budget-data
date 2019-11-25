'use strict';

import {IConfigFlags} from '../shared/base';
import {DbService} from '../shared/db';

export const runServer = (config: IConfigFlags) => {
  return new Promise(async resolve => {
    const dbService = new DbService(config);
    await dbService.init();
    let util = require('util');
    const open = require('open');

    const os = require('os');
    const dotenv = require('dotenv');
    const path = require('path');
    const configPath = config.configPath || path.resolve(os.homedir(), '.budget-data');
    const configName = config.configName || 'default';
    const envPath = `${configPath}/.env.${configName}`;
    dotenv.config({path: envPath});

    let envvar = require('envvar');
    let express = require('express');
    let bodyParser = require('body-parser');
    let moment = require('moment');
    let plaid = require('plaid');
    let mkdirp = require('mkdirp');

    let APP_PORT = envvar.number('APP_PORT', 8000);
    let PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
    let PLAID_SECRET = envvar.string('PLAID_SECRET');
    let PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
    let PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');
    let PLAID_USER_LEGAL_NAME = envvar.string('PLAID_USER_LEGAL_NAME');
    let PLAID_USER_EMAIL_ADDRESS = envvar.string('PLAID_USER_EMAIL_ADDRESS');

    // PLAID_PRODUCTS is a comma-separated list of products to use when initializing
    // Link. Note that this list must contain 'assets' in order for the app to be
    // able to create and retrieve asset reports.
    let PLAID_PRODUCTS = envvar.string('PLAID_PRODUCTS', 'transactions');

    // PLAID_PRODUCTS is a comma-separated list of countries for which users
    // will be able to select institutions from.
    let PLAID_COUNTRY_CODES = envvar.string(
      'PLAID_COUNTRY_CODES',
      'US,CA,GB,FR,ES'
    );

    // We store the access_token in memory - in production, store it in a secure
    // persistent data store
    let ACCESS_TOKEN = '';
    let PUBLIC_TOKEN = '';
    let ITEM_ID = null;

    // Initialize the Plaid client
    // Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
    let client = new plaid.Client(
      PLAID_CLIENT_ID,
      PLAID_SECRET,
      PLAID_PUBLIC_KEY,
      plaid.environments[PLAID_ENV],
      {version: '2019-05-29', clientApp: 'Plaid Quickstart'}
    );

    let app = express();
    app.use(express.static('src/server/public'));
    app.set('view engine', 'ejs');
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    app.use(bodyParser.json());

    app.get('/', function (_request: any, response: any) {
      mkdirp.sync(`${os.homedir()}/.plaid`);
      response.render(__dirname + '/views/index.ejs', {
        PLAID_PUBLIC_KEY,
        PLAID_ENV,
        PLAID_PRODUCTS,
        PLAID_COUNTRY_CODES,
        PLAID_USER_LEGAL_NAME,
        PLAID_USER_EMAIL_ADDRESS
      });
    });

    // Exchange token flow - exchange a Link public_token for
    // an API access_token
    // https://plaid.com/docs/#exchange-token-flow
    app.post('/get_access_token', (request: any, response: any) => {
      PUBLIC_TOKEN = request.body.public_token;
      let payload = JSON.parse(request.body.payload);
      client.exchangePublicToken(PUBLIC_TOKEN, async (
        error: any,
        tokenResponse: any
      ) => {
        if (error !== null) {
          prettyPrintResponse(error);
          return response.json({
            error
          });
        }
        ACCESS_TOKEN = tokenResponse.access_token;
        ITEM_ID = tokenResponse.item_id;
        dbService.accounts.insert({id: ITEM_ID, payload, tokenResponse});
        console.log(dbService);
        await dbService.flush();

        response.json({
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID,
          error: null
        });
      });
    });

    // Retrieve Transactions for an Item
    // https://plaid.com/docs/#transactions
    app.get('/transactions', function (_request: any, response: any) {
      // Pull transactions for the Item for the last 30 days
      let startDate = moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD');
      let endDate = moment().format('YYYY-MM-DD');
      client.getTransactions(
        ACCESS_TOKEN,
        startDate,
        endDate,
        {
          count: 250,
          offset: 0
        },
        function (error: any, transactionsResponse: any) {
          if (error !== null) {
            prettyPrintResponse(error);
            return response.json({
              error
            });
          } else {
            prettyPrintResponse(transactionsResponse);
            response.json({error: null, transactions: transactionsResponse});
          }
        }
      );
    });

    // Retrieve Identity for an Item
    // https://plaid.com/docs/#identity
    app.get('/identity', function (_request: any, response: any) {
      client.getIdentity(ACCESS_TOKEN, function (
        error: any,
        identityResponse: any
      ) {
        if (error !== null) {
          prettyPrintResponse(error);
          return response.json({
            error
          });
        }
        prettyPrintResponse(identityResponse);
        response.json({error: null, identity: identityResponse});
      });
    });

    let prettyPrintResponse = (response: any) => {
      // tslint:disable-next-line:no-console
      console.log(util.inspect(response, {colors: true, depth: 4}));
    };

    app.post('/set_access_token', function (
      request: any,
      response: any,
      _next: any
    ) {
      ACCESS_TOKEN = request.body.access_token;
      client.getItem(ACCESS_TOKEN, function (_error: any, itemResponse: any) {
        response.json({
          item_id: itemResponse.item.item_id,
          error: false
        });
      });
    });

    const server = app.listen(APP_PORT, function () {
      // tslint:disable-next-line:no-console
      console.log('login request server listening on port ' + APP_PORT);
      // tslint:disable-next-line:no-console
      console.log('press any key when done');
      // tslint:disable-next-line:no-http-string
      open(`http://localhost:${APP_PORT}`);
    });

    process.stdin.once('data', () => {
      console.log('Closing Server');
      server.close();
    });

    server.on('close', () => {
      console.log('Returning control to CLI');
      resolve();
    });
  });
};

import { test } from '@oclif/test';

import { copyDb, customLocalConfig, spyConsole } from '../local-config';

describe('transactions:download non-paged', () => {
  const cmd = [
    'transactions:download',
    ...customLocalConfig('test'),
    '--accountId=KXVGq'
  ];
  let spy = spyConsole();

  beforeEach(async done => {
    copyDb('test');
    done();
  });

  test
    .nock('https://sandbox.plaid.com', api => {
      api.post('/transactions/get').reply(200, {
        total_transactions: 10,
        transactions: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      });
    })
    .stdout()
    .command(cmd)
    .it('show try to download', () => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual([
        'First Page: Start at 0 retrieving 50',
        'Downloaded 10 transactions'
      ]);
    });
});

describe('transactions:download paged', () => {
  const cmd = [
    'transactions:download',
    ...customLocalConfig('test'),
    '--accountId=KXVGq'
  ];
  let spy = spyConsole();

  beforeEach(async done => {
    copyDb('test');
    done();
  });

  test
    .nock('https://sandbox.plaid.com', api => {
      api
        .post('/transactions/get')
        .times(2)
        .reply(200, {
          total_transactions: 20,
          transactions: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        });
    })
    .stdout()
    .command(cmd)
    .it('show try to download', ctx => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual([
        'First Page: Start at 0 retrieving 50',
        'Next Page: Start at 10 retrieving 50',
        'Downloaded 20 transactions'
      ]);
    });
});

describe('transactions:download bad account', () => {
  const cmd = [
    'transactions:download',
    ...customLocalConfig('test'),
    '--accountId=xxx'
  ];
  let spy = spyConsole();

  beforeEach(async done => {
    copyDb('test');
    done();
  });

  test
    .stdout()
    .command(cmd)
    .it('show try to download', ctx => {
      let lines = [].concat.apply([], spy.error.mock.calls);
      expect(lines).toEqual(['Account xxx not found']);
    });
});

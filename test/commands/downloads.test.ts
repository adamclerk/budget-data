
import {expect, test} from '@oclif/test';
import {resolve} from 'path';

describe('transactions:download', () => {
  const configPath = resolve(__dirname, '..');
  const cmd = [
    'transactions:download',
    `--configPath=${configPath}`,
    '--configName=sandbox',
    '--accountId=ZQ4Zbd'
  ];
  test
    .nock('https://sandbox.plaid.com', api => {
      api.post('/transactions/get')
        .reply(200, {
          total_transactions: 10,
          transactions: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ]
        });
    })
    .stdout()
    .command(cmd)
    .it('shows user email when logged in', ctx => {
      expect(ctx.stdout).to.equal('First Page: Start at 0 retrieving 50\nDownloaded 10 transactions\n');
    });
});

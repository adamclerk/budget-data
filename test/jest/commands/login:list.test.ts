import { test } from '@oclif/test';

import { customLocalConfig, spyConsole } from '../local-config';

describe('login:list', () => {
  let spy = spyConsole();
  const cmd = ['login:list', ...customLocalConfig()];
  test
    .stdout()
    .command(cmd)
    .it('shows accounts the system knows about', ctx => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual([
        'Institution: Citi',
        'Id: KXVGq4jRadTx68pya7LgclLK69Av7ecVPojVn',
        'Accounts: 8',
        ''
      ]);
    });
});

describe('login:list details', () => {
  let spy = spyConsole();
  const cmd = ['login:list', '--details', ...customLocalConfig()];
  test
    .stdout()
    .command(cmd)
    .it('shows accounts the system knows about with details', ctx => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual([
        'Institution: Citi',
        'Id: KXVGq4jRadTx68pya7LgclLK69Av7ecVPojVn',
        'Accounts: 8',
        '  Name: Plaid Checking',
        '  Type: depository',
        '',
        '  Name: Plaid Saving',
        '  Type: depository',
        '',
        '  Name: Plaid CD',
        '  Type: depository',
        '',
        '  Name: Plaid Credit Card',
        '  Type: credit',
        '',
        '  Name: Plaid Money Market',
        '  Type: depository',
        '',
        '  Name: Plaid IRA',
        '  Type: investment',
        '',
        '  Name: Plaid 401k',
        '  Type: investment',
        '',
        '  Name: Plaid Student Loan',
        '  Type: loan',
        '',
        ''
      ]);
    });
});

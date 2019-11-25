import { test } from '@oclif/test';

import { copyDb, customLocalConfig, spyConsole } from '../local-config';

describe('login:remove with account', () => {
  let spy = spyConsole();
  const cmd = ['login:remove', ...customLocalConfig('test'), 'KXVGq'];
  beforeEach(async done => {
    copyDb('test');
    done();
  });
  test
    .stdout()
    .command(cmd)
    .it('shows accounts the system knows about', ctx => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual([
        'Found 1 account',
        'Id: KXVGq4jRadTx68pya7LgclLK69Av7ecVPojVn',
        '1 account removed'
      ]);
    });
});

describe('login:remove without account', () => {
  let spy = spyConsole();
  const cmd = ['login:remove', ...customLocalConfig('test')];

  beforeEach(async done => {
    copyDb('test');
    done();
  });

  test
    .stdout()
    .command(cmd)
    .it('shows accounts the system knows about', ctx => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual(['Found 0 accounts', '0 accounts removed']);
    });
});

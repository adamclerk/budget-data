import { test } from '@oclif/test';

import { customLocalConfig, spyConsole } from '../local-config';

describe('stats', () => {
  let spy = spyConsole();
  const cmd = ['stats', ...customLocalConfig()];
  test
    .stdout()
    .command(cmd)
    .it('shows accounts the system knows about', () => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual([
        'I know about:',
        ' 1 account',
        ' 211 transactions'
      ]);
    });
});

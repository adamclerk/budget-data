import { test } from '@oclif/test';

import * as server from '../../../src/server';
import { customLocalConfig, spyConsole } from '../local-config';

describe('login:add', () => {
  beforeEach(() => {
    jest.spyOn(server, 'runServer').mockImplementation(() => {
      console.log('Running Server');
      return Promise.resolve(true);
    });
  });
  let spy = spyConsole();
  const cmd = ['login:add', ...customLocalConfig()];
  test
    .stdout()
    .command(cmd)
    .it('shows user email when logged in', ctx => {
      let lines = [].concat.apply([], spy.log.mock.calls);
      expect(lines).toEqual(['Running Server', 'Command done']);
    });
});

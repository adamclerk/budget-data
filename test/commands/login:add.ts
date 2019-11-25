import {expect, test} from '@oclif/test';
import * as sinon from 'sinon';

import * as server from '../../src/server';

describe('transactions:download', () => {
  beforeEach(() => {
    sinon.stub(server, 'runServer').returns(Promise.resolve(true));
  });
  const cmd = [
    'login:add'
  ];
  test
    .stdout()
    .command(cmd)
    .it('shows user email when logged in', ctx => {
      expect(ctx.stdout).to.equal('First Page: Start at 0 retrieving 50\nDownloaded 10 transactions\n');
    });
});

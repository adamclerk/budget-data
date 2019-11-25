import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
const configPath = resolve(process.cwd(), 'test/');

export const customLocalConfig = (name = 'sandbox') => {
  return [`--configPath=${configPath}`, `--configName=${name}`];
};

export function spyConsole() {
  let spy: any = {};

  beforeEach(() => {
    spy.log = jest.spyOn(console, 'log').mockImplementation(() => { });
    spy.error = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    spy.log.mockClear();
    spy.error.mockClear();
  });

  afterAll(() => {
    spy.log.mockRestore();
    spy.error.mockRestore();
  });

  return spy;
}

export function copyDb(name: string) {
  if (name === 'sandbox') {
    name = 'sndbox';
  }

  name = name.replace(/ /g, '_');
  const db = readFileSync(resolve(process.cwd(), 'test/budget.sandbox'));
  const config = readFileSync(resolve(process.cwd(), 'test/.env.sandbox'));

  const dbString = db.toString().replace('budget.sandbox', `budget.${name}`);

  writeFileSync(resolve(process.cwd(), `test/budget.${name}`), dbString);
  writeFileSync(resolve(process.cwd(), `test/.env.${name}`), config);
}

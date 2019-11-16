import {config} from 'dotenv';
import {homedir} from 'os';
import {resolve} from 'path'
const envPath = resolve(homedir(), '.plaid/.env')
config({path: envPath});

export {run} from '@oclif/command'


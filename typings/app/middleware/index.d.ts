// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAuth = require('../../../app/middleware/auth');
import ExportException = require('../../../app/middleware/exception');
import ExportPreUpload = require('../../../app/middleware/preUpload');
import ExportTransfer = require('../../../app/middleware/transfer');

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    exception: typeof ExportException;
    preUpload: typeof ExportPreUpload;
    transfer: typeof ExportTransfer;
  }
}

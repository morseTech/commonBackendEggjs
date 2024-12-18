// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportIndex = require('../../../app/model/index');

declare module 'egg' {
  interface IModel {
    Index: ReturnType<typeof ExportIndex>;
  }
}

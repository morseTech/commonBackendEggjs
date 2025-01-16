// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCard = require('../../../app/model/card');
import ExportCategory = require('../../../app/model/category');
import ExportInitModels = require('../../../app/model/init-models');
import ExportSpidertask = require('../../../app/model/spidertask');

declare module 'egg' {
  interface IModel {
    Card: ReturnType<typeof ExportCard>;
    Category: ReturnType<typeof ExportCategory>;
    InitModels: ReturnType<typeof ExportInitModels>;
    Spidertask: ReturnType<typeof ExportSpidertask>;
  }
}

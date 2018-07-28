
'use strict';

import { BaseService } from './baseService';

class TestService extends BaseService {
  constructor(ctx) {
    super(ctx.model.Role);
    console.dir('===========');
    // console.dir(ctx);
  }
}


module.exports = TestService;

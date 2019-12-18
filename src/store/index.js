import Tinax from '@tinajs/tinax'

import pages from './modules/page';
import user from './modules/user'

export const tinax = new Tinax({
  modules: {
    pages,
    user
  },
});

// for debug
global.tinax = tinax;

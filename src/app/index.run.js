(function() {
  'use strict';

  angular
    .module('angular-course')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

'use strict';

angular.module('mxviewCloud')
  .factory('Socket', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return socket;
  });

  /*.factory('Socket', function () {

    return {
      socket: {
        connect: angular.noop,
        on: angular.noop,
        emit: angular.noop,
        receive: angular.noop
      },
      emit: angular.noop,
      on: angular.noop,
      clean: angular.noop,
      syncModel: angular.noop,
      unsyncModel: angular.noop
    };

  });*/

#!/usr/bin/env node
process.chdir(__dirname);

// Dependencies
var optimist = require('optimist');
var path = require('path');

// Forever curry
var forever = (function () {
  var foreverPath = path.resolve('../node_modules/forever/bin/forever');
  var exec = require('child_process').exec;
  return function (cmd, callback) {
    callback = callback || function () {};

    exec('node ' + foreverPath + ' ' + cmd, [], function (err, stdout, stderr) {
      if (err) {
        throw err;
      }

      process.stdout.write(stdout);
      process.stderr.write(stderr);
      
      callback();
    });
  };  
})();

// Command line actions
var actions = {
  _usage: function () {
    var usage = 'Actions:\n';

    // Get actions with description
    var desc = this._withDescription();

    // Check for longest option
    var nameSpace = 0;
    desc.forEach(function (d) {
      var len = d.name.length;
      if (len > nameSpace) {
        nameSpace = len;
      }
    });

    // Construct usage
    desc.forEach(function (d, index) {
      usage += '  ' + d.name + '  ';

      // Name padding
      for (i = 0, ii = nameSpace - d.name.length; i < ii; i += 1) {
        usage += ' ';
      }

      usage += d.description;

      if (index !== desc.length - 1) {
        usage += '\n';
      }
    });

    return usage;
  },

  _withDescription: function () {
    var desc = [];
    
    for (var p in this) {
      if (typeof this[p] === 'object') {
        desc.push({
          name: p,
          description: this[p].description
        });
      }
    }

    return desc;
  },

  _run: function (action) {
    if (typeof this[action] === 'object') {
      this[action].run();
    } else {
      this[action]();
    }
  },

  start: {
    description: 'Runs new instance of the server',
    run: function () {
      forever('start -m 100 ../server.js');
    }
  },

  stop: {
    description: 'Stops all pelican instances', 
    run: function () {
      forever('stopall');
    }
  },

  restart: {
    description: 'Restarts all pelicans',
    run: function () {
      forever('restartall');
    }
  },

  list: {
    description: 'Lists all running pelican servers', 
    run: function () {
      forever('list');
    }
  },

  help: function () {
    optimist.showHelp(console.log);
  },

  version: function () {
    console.log('v' + require('../package.json').version);
  }
};

// Optimist options
optimist = optimist.alias('v', 'version');
optimist = optimist.describe('v', 'Prints version number');
optimist = optimist.alias('h', 'help');
optimist = optimist.describe('h', 'This screen');
optimist = optimist.usage('Usage: pelican [options] action\n\n' + actions._usage());
optimist = optimist.check(function (argv) {
  // Arguments to actions mapping
  if (argv.version) {
    argv._[0] = 'version';
  } else if (argv.help) {
    argv._[0] = 'help';
  }

  var action = argv._[0];
  // Check arguments length
  if (argv._.length !== 1) {
    throw new Error('You must specify one action');
  }

  // Check if action exists
  if (!(action in actions)) {
    throw new Error('Invalid action "' + action + '"');
  }
});

// Execute action
actions._run(optimist.argv._[0]);

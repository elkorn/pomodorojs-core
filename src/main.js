const { PomodoroJS } = require('./core');
const StatePlugin = require('./plugins/state');
const StatsPlugin = require('./plugins/stats');
const signals = require('./signals');

function bootstrap({ plugins, ui }) {
  const basePlugins = [
    new StatePlugin(),
    new StatsPlugin({ ui }),
    ui,
  ];

  const pomodorojs = new PomodoroJS({
    plugins: basePlugins.concat(plugins),
  });

  function exitGracefully() {
    ui.exit({ pomodorojs });
    process.exit(0);
  }

  signals.onInterrupt(exitGracefully);
  signals.onTerminate(exitGracefully);

  this.exit = exitGracefully;
  this.start = () => ui.start({ pomodorojs });

  return this;
}

module.exports = bootstrap;

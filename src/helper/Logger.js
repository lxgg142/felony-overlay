const remote = require('@electron/remote');
const con = remote.getGlobal('console');

/**
 * @author lxgg#8588
 */
class LoggerManager {
  /**
   * @param {String} prefix
   */
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(msg) {
    con.log(`[${this.prefix} Log] ${msg}`);
  }

  error(msg) {
    con.error(`[${this.prefix} Error] ${msg}`);
  }
}

module.exports = LoggerManager;

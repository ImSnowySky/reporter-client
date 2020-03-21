import ErrorFactory from '../ErrorFactory';

const types = {
  default: 'default',
  custom: 'custom',
};

class Reporter {
  constructor({ backend = null }) {
    if (!window) {
      throw Error('Reporter must see window object');
    }
    this.backend = backend;
    this.mountWatcher();
  }

  mountWatcher = () => {
    window.onerror = function(errMsg, url, lineNumber) {
      const error = ErrorFactory.create({ errMsg, url, lineNumber }, types.default);
      console.log(error.info);
    }
  }

  report = message => {
    const error = ErrorFactory.create(message, types.custom);
    console.log(error.info);
  }
}

export default Reporter;
import ErrorFactory from '../ErrorFactory';
import { fetch as fetchPolyfill } from 'whatwg-fetch'

const types = {
  default: 'default',
  custom: 'custom',
};

class Reporter {
  constructor({ backend = null }) {
    if (!window) throw Error('Reporter must see window object');
    this.backend = backend;

    this.mountWatcher();
  }

  isBackendExists = async () => {
    try {
      const response = await fetchPolyfill(`${this.backend}/api/v1/init`);
      const result = await response.json();
      return result.status === 'OK';
    } catch (e) {
      console.error('Reporter backend is not exists');
      return false;
    }
  }

  generateError = (message, type) => {
    const error = ErrorFactory.create(message, type);
    fetchPolyfill(`${this.backend}/api/v1/error`, {
      method: 'POST',
      credentials: 'origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(error.info),
    });
    return error;
  }

  report = message => this.generateError(message, types.custom);

  mountWatcher = async () => {
    const backendExists = await this.isBackendExists();
    if (!backendExists) return false;
    window.onerror = (errMsg, url, lineNumber) => this.generateError({ errMsg, url, lineNumber }, types.default);
  }
}

export default Reporter;
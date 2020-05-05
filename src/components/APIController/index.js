import { fetch as fetchPolyfill } from 'whatwg-fetch'
import * as Bowser from 'bowser';

let controller = null;

class APIController {
  constructor({ backend = null }) {
    if (!!APIController.instance) return APIController.instance;
    if (!backend) throw Error('Can not create API Controller without backend URL');
    APIController.instance = this;
    this.backend = backend;
  }

  isBackendExists = async () => {
    try {
      const response = await fetchPolyfill(`${this.backend}/api/v1/init`);
      const result = await response.json();
      return result.status === 'OK';
    } catch (e) {
      return false;
    }
  };

  isHashExists = async (hash) => {
    try {
      const response = await fetchPolyfill(`${this.backend}/api/v1/visitors/hash_exists?hash=${hash}`);
      const result = await response.json();
      if (!result.status === 'OK') throw Error('Something went wrong while trying to get user ID');
      return result.response;
    } catch (e) {
      return false;
    }
  }

  registerUser = async () => {
    try {
      const { browser, os, platform } = Bowser.parse(window.navigator.userAgent);
      const response = await fetchPolyfill(`${this.backend}/api/v1/visitors/create`, {
        method: 'POST',
        credentials: 'origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          browser: browser.name,
          browser_version: browser.version,
          os: os.name,
          os_version: os.versionName,
          platform: platform.type,
          user_agent: window.navigator.userAgent,
        })
      });
      const result = await response.json();
      if (!result.status === 'OK') throw Error('Something went wrong while trying to get user ID');
      return result.response;
    } catch (e) {
      return false;
    }
  };

  report = async reportInformation => {
    try {
      const response = await fetchPolyfill(`${this.backend}/api/v1/reports/create`, {
        method: 'POST',
        credentials: 'origin',
        headers: { 'Content-Type': 'application/json' },
        body: reportInformation,
      });
      const result = await response.json();
      if (!result.status === 'OK') throw Error('Something went wrong while trying to send report information');
      return true;
    } catch (e) {
      return false;
    }
  }

  static create = async ({ backend = null }) => {
    if (!controller) controller = new APIController({ backend });
    const isBackendExists = await controller.isBackendExists();
    return isBackendExists ? controller : false;
  }
}

export default APIController;
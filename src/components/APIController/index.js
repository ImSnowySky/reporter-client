import { fetch as fetchPolyfill } from 'whatwg-fetch'

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
  }

  registerUser = async () => {
    try {
      const response = await fetchPolyfill(`${this.backend}/api/v1/get_visitor_id`);
      const result = await response.json();
      if (!result.status === 'OK') throw Error('Something went wrong while trying get user ID');
      return result.response;
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
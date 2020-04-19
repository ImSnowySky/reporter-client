import User from '../User';
import APIController from '../APIController';
import ReportFactory from '../ReportFactory';
import types from '../../shared/reportTypes';

class Reporter {
  constructor({ backend = null, afterInit = () => { } }) {
    if (!!Reporter.instance) return Reporter.instance;
    if (!window) throw Error('Reporter must see window object');
    
    Reporter.instance = this;

    this.initialized = false;
    APIController.create({ backend })
      .then(controller => {
        if (!controller) throw Error('Backend for Reporter is not exists');
        this.APIController = controller;
        return controller;
      })
      .then(controller => User.create({ APIController: controller }))
      .then(user => {
        if (!user) throw Error('Can not initialize user for Reporter');
        this.User = user;
        return user;
      })
      .then(() => {
        this.initialized = true;
        afterInit(this);
      });
  }

  report = (info = 'Unknown error', type =  types.error) => {
    if (!this.initialized) {
      console.warn('Reporter is not initialized and report will not be send');
      return false;
    }

    const _info = ReportFactory.create({ type, info, user: this.User, APIController: this.APIController }).serialize();
    console.log(_info);
  }

  /*
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

    const visitorID = await this.getVisitorID();
    if (!visitorID) return false;

    window.onerror = (errMsg, url, lineNumber) => this.generateError({ errMsg, url, lineNumber }, types.default);
  }
  */
}

export default Reporter;
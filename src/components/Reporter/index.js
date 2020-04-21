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

    ReportFactory.create({ type, info, user: this.User, APIController: this.APIController });
  }
}

export default Reporter;
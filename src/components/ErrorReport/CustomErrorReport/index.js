import ErorrReport from '../index';

class CustomErrorReport extends ErorrReport {
  constructor(message) {
    super();
    this._private = { };
    this._private.meta = {
      url: window.location.href,
      errMsg: message,
    };
  }

  getMetaInfo = () => this._private.meta;

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
    ...this.getMetaInfo(),
    custom: true,
  });
}

export default CustomErrorReport;
import ErorrReport from '../index';

class DefaultErrorReport extends ErorrReport {
  constructor({ url, lineNumber, errMsg }) {
    super();
    this._private = { };
    this._private.meta = { url, lineNumber, errMsg };
  }

  getMetaInfo = () => this._private.meta;

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
    ...this.getMetaInfo(),
    custom: false,
  });
}

export default DefaultErrorReport;
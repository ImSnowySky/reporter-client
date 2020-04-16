import ErorrReport from '../index';

class DefaultErrorReport extends ErorrReport {
  constructor({ url, lineNumber, errMsg }) {
    super();
    this._private = { };
    this._private.meta = { url, line_number: lineNumber, message: errMsg };
  }

  getMetaInfo = () => this._private.meta;

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
    ...this.getMetaInfo(),
    ...this.getDisplayInfo(),
    type: 'error',
  });
}

export default DefaultErrorReport;
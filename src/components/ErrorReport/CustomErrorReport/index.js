import ErorrReport from '../index';

class CustomErrorReport extends ErorrReport {
  constructor(message) {
    super();
    this._private = { };
    this._private.meta = { url: window.location.href, message, line_number: 0 };
  }

  getMetaInfo = () => this._private.meta;

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
    ...this.getMetaInfo(),
    ...this.getDisplayInfo(),
    type: 'custom',
  });
}

export default CustomErrorReport;
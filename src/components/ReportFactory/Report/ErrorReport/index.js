import Report from '../index';
import types from '../../../../shared/reportTypes';

class ErrorReport extends Report {
  constructor({ info, user }) {
    super({ info, user });
  }

  getErrorInfo = () => ({
    url: this.info.url,
    line_number: this.info.lineNumber,
    message: this.info.errMsg,
  })

  getSummaryError = () => ({
    ...this.getUserInfo(),
    ...this.getDisplayInfo(),
    ...this.getErrorInfo(),
    type: types.error,
  });
}

export default ErrorReport;
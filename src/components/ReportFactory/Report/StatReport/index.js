import Report from '../index';
import types from '../../../../shared/reportTypes';

class StatReport extends Report {
  constructor({ info, user }) {
    super({ info, user });
  }

  getInformation = () => ({
    url: window.location.href,
    message: this.info.message,
    additional: this.info.additional,
  })

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
    ...this.getDisplayInfo(),
    ...this.getInformation(),
    type: types.stat,
  });
}

export default StatReport;
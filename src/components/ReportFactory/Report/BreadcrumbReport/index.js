import Report from '../index';
import types from '../../../../shared/reportTypes';

class BreadcrumbReport extends Report {
  constructor({ info, user }) {
    super({ info, user });
  }

  getInformation = () => ({
    url: window.location.href,
    message: this.info.message,
  })

  getSummaryError = () => ({
    ...this.getUserInfo(),
    ...this.getDisplayInfo(),
    ...this.getInformation(),
    type: types.breadcrumb,
  });
}

export default BreadcrumbReport;
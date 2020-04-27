import types from '../../shared/reportTypes';
import ErrorReport from './Report/ErrorReport';
import BreadcrumbReport from './Report/BreadcrumbReport';

class ReportFactory {
  static createErrorReport = ({ info, user }) => new ErrorReport({ info, user });
  static createBreadcrumbReport = ({ info, user }) => new BreadcrumbReport({ info, user });

  static create = ({ type, info, user, APIController }) => {
    const reportByType = {
      [types.error]: this.createErrorReport,
      [types.breadcrumb]: this.createBreadcrumbReport,
    };

    const report = reportByType[type]({ info, user });
    
    APIController.report(report.serialize())
      .then(res => {
        if (!res) console.error('Report was not sended');
      })

    return report;
  }
}

export default ReportFactory;
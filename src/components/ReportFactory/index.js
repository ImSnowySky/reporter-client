import types from '../../shared/reportTypes';
import ErrorReport from './Report/ErrorReport';
import StatReport from './Report/StatReport';

class ReportFactory {
  static createErrorReport = ({ info, user }) => new ErrorReport({ info, user });
  static createStatReport = ({ info, user }) => new StatReport({ info, user });

  static create = ({ type, info, user, APIController }) => {
    const reportByType = {
      [types.error]: this.createErrorReport,
      [types.stat]: this.createStatReport,
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
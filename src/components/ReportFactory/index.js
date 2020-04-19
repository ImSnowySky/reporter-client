import types from '../../shared/reportTypes';
import ErrorReport from './Report/ErrorReport';
import CustomErrorReport from "../ErrorReport/CustomErrorReport";

class ReportFactory {
  static createErrorReport = ({ info, user }) => new ErrorReport({ info, user });
  static createCustomReport = ({ info, user }) => new CustomErrorReport({ info, user });

  static create = ({ type, info, user, APIController }) => {
    const reportByType = {
      [types.error]: this.createErrorReport,
      [types.custom]: this.createCustomReport,
    };

    return reportByType[type]({ info, user });
  }
}

export default ReportFactory;
import DefaultErrorReport from "../ErrorReport/DefaultErrorReport";
import CustomErrorReport from "../ErrorReport/CustomErrorReport";

class ErrorFactory {
  static createDefaultReport = (errInfo) => new DefaultErrorReport(errInfo);
  static createCustomReport = message => new CustomErrorReport(message);

  static create = (errInfo, type = 'default') => {
    const reportByType = {
      default: this.createDefaultReport,
      custom: this.createCustomReport,
    };

    return reportByType[type](errInfo);
  }
}

export default ErrorFactory;
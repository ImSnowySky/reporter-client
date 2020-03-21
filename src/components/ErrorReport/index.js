import * as Bowser from 'bowser';

class ErorrReport {
  constructor() { }
  getUA = () => ({ userAgent: window.navigator.userAgent });
  getBrowserInfo = () => {
    const { browser, os, platform } = Bowser.parse(window.navigator.userAgent);
    return { browser, os, platform };
  }

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
  });

  get info() {
    return this.getSummaryError();
  }

  set info(_) {}
  

  serialize() {
    return JSON.stringify(this.info);
  }
}

export default ErorrReport;
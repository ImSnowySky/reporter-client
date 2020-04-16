import * as Bowser from 'bowser';

class ErorrReport {
  constructor() { }
  getUA = () => ({
    user_agent: window.navigator.userAgent,
    user_time: new Date().toUTCString(),
  });

  getBrowserInfo = () => {
    const { browser, os, platform } = Bowser.parse(window.navigator.userAgent);
    const preparedObject = {
      browser: browser.name,
      browser_version: browser.version,
      os: os.name,
      os_version: os.versionName,
      platform: platform.type,
    }
    return preparedObject;
  }

  getDisplayInfo = () => ({
    display_width: window.innerWidth,
    display_height: window.innerHeight,
  })

  getSummaryError = () => ({
    ...this.getUA(),
    ...this.getBrowserInfo(),
    ...this.getDisplayInfo(),
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
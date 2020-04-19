import * as Bowser from 'bowser';

class Report {
  constructor({ info, user }) {
    this.info = info;
    this.user = user;
  }

  getUA = () => ({
    user_agent: window.navigator.userAgent,
    user_time: new Date().toUTCString(),
    user_id: this.user.id,
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

  get summary() {
    return this.getSummaryError();
  }

  set summary(_) {}

  serialize() {
    return JSON.stringify(this.summary);
  }
}

export default Report;
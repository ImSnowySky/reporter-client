import * as Bowser from 'bowser';

class Report {
  constructor({ info, user }) {
    this.info = info;
    this.user = user;
  }

  getTime = () => ({
    user_time: new Date().toUTCString(),
    user_id: this.user.id,
  });

  getDisplayInfo = () => ({
    display_width: window.innerWidth,
    display_height: window.innerHeight,
  })

  getSummaryError = () => ({
    ...this.getTime(),
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
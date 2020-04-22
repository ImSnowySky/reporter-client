class Report {
  constructor({ info, user }) {
    this.info = info;
    this.user = user;
  }

  getUserInfo = () => ({
    user_time: new Date().toISOString(),
    user_hash: this.user.id,
  });

  getDisplayInfo = () => ({
    display_width: window.innerWidth,
    display_height: window.innerHeight,
  })

  getSummaryError = () => ({
    ...this.getUserInfo(),
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
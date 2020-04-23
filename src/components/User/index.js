let user = null;

class User {
  constructor({ APIController = null }) {
    if (!!User.instance) return User.instance;
    User.instance = this;
    this.id = sessionStorage.getItem('reporter--user-hash');
    this.isInitialized = Boolean(sessionStorage.getItem('reporter--user-hash'));
    this.APIController = APIController;
  }

  async isHashExists({ APIController = this.APIController }) {
    const isHashExists = await APIController.isHashExists(this.id);
    return !!isHashExists;
  }

  async register() {
    if (this.isInitialized) {
      const isHashExists = await this.isHashExists({ APIController: this.APIController });
      if (isHashExists) return true;
    }

    const possibleID = await this.APIController.registerUser();
    if (!possibleID) {
      console.warn("Can't get visitor id");
      return false; 
    }

    this.id = possibleID;
    this.isInitialized = true;
    sessionStorage.setItem('reporter--user-hash', possibleID);
    return this.isInitialized;
  }

  static create = async ({ APIController = this.APIController }) => {
    if (!user) {
      user = new User({ APIController });
      const isUserExists = await user.register();
      return isUserExists ? user : false;
    }

    return user;
  }
}

export default User;
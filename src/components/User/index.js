let user = null;

class User {
  constructor({ APIController = null }) {
    if (!!User.instance) return User.instance;
    User.instance = this;
    this.id = null;
    this.isInitialized = false;
    this.APIController = APIController;
  }

  async register() {
    if (this.isInitialized) return this.isInitialized;

    const possibleID = await this.APIController.registerUser();
    if (!possibleID) {
      console.warn("Can't get visitor id");
      return false; 
    }

    this.id = possibleID;
    this.isInitialized = true;
    return this.isInitialized;
  }

  static create = async ({ APIController = null }) => {
    if (!user) {
      user = new User({ APIController });
      const isUserExists = await user.register();
      return isUserExists ? user : false;
    }

    return user;
  }
}

export default User;
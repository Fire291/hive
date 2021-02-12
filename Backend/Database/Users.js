let User;
class Users {
  static async injectDB(conn) {
    if (User) {
      return;
    }
    try {
      User = await conn.db("Hive").collection("Users");
    } catch (e) {
      console.error(
        `Unable to establish connection with Facebbok collecion: ${e}`
      );
    }
  }
  /**
   * @param {string} UserName
   * @param {string} Email
   * @param {object} Passowrd
   * @returns {result}
   */
  static async addUser(UserName, Email, Password) {
    try {
      let doc = { UserName: UserName, Email: Email, Password: Password };
      await User.insertOne(doc, { w: "majority", wtimeout: 2500 });
      return { success: true };
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        console.error("Same user exists in DataBase");
        return { error: "Same user exists in DataBase" };
      }
    }
  }
}
/**
 * @typedef result
 * @property {boolean} [success] - success
 * @property {string} [error] - error
 */
module.exports = Users;

export class Chat {
  /**
   *
   * @param {Object} data
   */
  constructor(data) {
    /** @public {number} */
    this.id = data.id;
    /** @public {string} */
    this.name = data.name;
    /** @public {Array<number>} */
    this.users = data.users;
    /** @public {string} */
    this.createdAt = data.createdAt;
  }

  /**
   * @return {{}}
   */
  asJson() {
    return {
      id: this.id,
      name: this.name,
      users: this.users,
      createdAt: this.createdAt,
    }
  }
}
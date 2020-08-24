export class Message {
  /**
   *
   * @param {Object} data
   */
  constructor(data) {
    /** @public {number} */
    this.id = data.id;
    /** @public {number} */
    this.chat = data.chat
    /** @public {number} */
    this.author = data.author;
    /** @public {string} */
    this.text = data.text;
    /** @public {string} */
    this.createdAt = data.createdAt;
  }

  /**
   * @return {{}}
   */
  asJson() {
    return {
      id: this.id,
      chat: this.chat,
      author: this.author,
      text: this.text,
      createdAt: this.createdAt,
    }
  }
}
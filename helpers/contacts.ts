class Contacts {
  Links = {
    GITHUB: "https://github.com/stLucky",
    TWITTER: "https://twitter.com/LuckkySteven",
    TELEGRAM: "https://t.me/stLuckkyy",
    EMAIL: "mailto:asys4759@gmail.com"
  } as const;

  getName (name: keyof typeof this.Links) {
    const separator = name === "EMAIL" ? ":" : "/";
    const arr = this.Links[name].split(separator);
    return arr[arr.length - 1];
  }
}

export default new Contacts();

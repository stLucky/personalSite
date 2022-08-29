type Paths = {
  index: "/"
  about: "/about"
  portfolios: "/portfolios"
  contacts: "/contacts"
}

class Routes {
  readonly Names = {
    HOME: "index",
    ABOUT: "about",
    PORTFOLIOS: "portfolios",
    CONTACTS: "contacts"
  } as const;

  get Paths () {
    return Object.keys(this.Names).reduce((result, key) => {
      result[this.Names[key]] =
        this.Names[key] === this.Names.HOME ? "/" : `/${this.Names[key]}`;
      return result;
    }, {} as Record<string, string>) as Paths;
  }
}

export default new Routes();

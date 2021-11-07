class Navigator {
  public router = null;

  public prefix = "";

  public params = {};

  set({ router, prefix }: { router: any; prefix?: string }) {
    this.setRouter(router);

    this.prefix = prefix;
  }

  setRouter(router: any) {
    this.router = router;
  }

  navigate(screen: string, params: { [key: string]: any } = {}, query?: boolean) {
    this.params = { ...params };
    this.router?.navigate(screen, query ? { ...params } : {});
  }

  back() {
    this.params = {};
    this.router?.goBack();
  }

  canGoBack() {
    return this.router?.canGoBack();
  }

  backToRoot() {
    this.router.popToTop();
  }

  getRouteName() {
    return `${this.router?.route.name}`.toLowerCase();
  }
}

export const navigation = new Navigator();

export class AccessToken {
  private static token: string;

  public static set(accessToken: string) {
    this.token = accessToken;
    localStorage?.setItem('accessToken', accessToken);
  }
  public static get() {
    return (
      this.token ||
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('accessToken'))
    );
  }
}

export class AccessToken {
  public static set(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }
  public static get() {
    return localStorage.getItem('accessToken');
  }
}

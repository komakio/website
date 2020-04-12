export class Environment {
  public static isDev =
    typeof document !== 'undefined' &&
    document?.location.hostname === 'localhost';

  public static env = Environment.isDev
    ? 'develoment'
    : typeof document !== 'undefined' &&
      document?.location.hostname === 'komak.io'
    ? 'production'
    : 'staging';

  public static recaptchaKey =
    Environment.env === 'production'
      ? '6Lez3eYUAAAAACx_bWV_X3D6K16O1y4uan-km5K6'
      : '6Lc2ReUUAAAAAM-UBGGFTLOELBlVRme90hR-F1AM';

  public static backendUrl =
    Environment.env === 'production'
      ? 'https://api.komak.io'
      : 'https://api-staging.komak.io';
}

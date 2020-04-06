export class Environment {
  public static recaptchaKey =
    typeof document !== 'undefined' &&
    document?.location.hostname === 'komak.io'
      ? '6Lez3eYUAAAAACx_bWV_X3D6K16O1y4uan-km5K6'
      : '6Lc2ReUUAAAAAM-UBGGFTLOELBlVRme90hR-F1AM';

  public static backendUrl =
    typeof document !== 'undefined' &&
    document?.location.hostname === 'komak.io'
      ? 'https://api.komak.io'
      : 'https://api-staging.komak.io';
}

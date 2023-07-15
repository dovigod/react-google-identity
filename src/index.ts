import useGoogleIdentity from './useGoogleIdentity';
export {
  revokeUser,
  cancelFlow,
  storeCredential
} from './utils/oauth'
declare global {
  interface Window { google: any; }
}
export { useGoogleIdentity };

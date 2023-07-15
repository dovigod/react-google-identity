/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecoder } from "./parser";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export type UXMode = 'popup' | 'redirect';
export type loginContext = 'signin' | 'signup' | 'use';
type GsiButtonType = 'icon' | 'standard';
type GsiButtonTheme = 'outline' | 'filled_blue' | 'filled_black';
type GsiButtonSize = 'small' | 'large' | 'medium';
type GsiButtonText = 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
type GsiButtonShape = 'rectangular' | 'pill' | 'circle' | 'square';
type GsiButtonWidth = number;
type GsiButtonLogoAlignment = 'left' | 'center';
type GsiButtonLocale = string;

export interface GsiButtonConfiguration{
  type? :GsiButtonType;
  theme?: GsiButtonTheme;
  size?: GsiButtonSize;
  text?: GsiButtonText;
  shape?: GsiButtonShape;
  logoAlignment?: GsiButtonLogoAlignment;
  width?: GsiButtonWidth;
  locale?: GsiButtonLocale;
  clickListener?: Function;
}
export interface ClientInitializeOption{
  callback: Function;
  clientId : string
  autoSelect?: boolean; 
  loginURI? : string;
  nativeCallback? : Function;
  cancelOnTapOutSide? : boolean;
  promptParentId? : string;
  nonce? : string;
  stateCookieDomain?: string;
  uxMode? : UXMode;
  allowedParentOrigin? : string | string[];
  intermediateIframeCloseCallback?: Function;
  itpSupport?: boolean;
  context? : loginContext
}
export function initializeGapiClient({
  autoSelect,
  loginURI,
  cancelOnTapOutSide,
  callback,
  clientId,
  nativeCallback,
  promptParentId,
  nonce,
  stateCookieDomain,
  uxMode,
  allowedParentOrigin,
  intermediateIframeCloseCallback,
  itpSupport,
  context
} : ClientInitializeOption) {
  const gapi = window.google;
  gapi.accounts.id.initialize({
    auto_select : autoSelect,
    login_uri : loginURI,
    cancel_on_tap_outside : cancelOnTapOutSide,
    itp_support : itpSupport,
    context : context,
    ux_mode : uxMode,
    callback : (userCredential : any) => {
      let unpackedJWT = jwtDecoder(userCredential.credential);
      unpackedJWT = JSON.parse(unpackedJWT)
      callback(unpackedJWT)
    },
    client_id: clientId,
    native_callback: nativeCallback,
    prompt_parent_id : promptParentId,
    nonce,
    state_cookie_domain : stateCookieDomain,
    allowed_parent_origin: allowedParentOrigin,
    intermediate_iframe_cloas_callback: intermediateIframeCloseCallback,
  });
}

export function renderButton(host: HTMLElement , renderOption : GsiButtonConfiguration) {
  const gapi = window.google;


  gapi.accounts.id.renderButton(host, renderOption);
}

export function prompt(onPrompt?: Function) {
  const gapi = window.google;
  gapi.accounts.id.prompt(onPrompt);
}
export function revokeUser(login_hint: string , onRevokeCb : Function){
  const gapi = window.google;
  gapi.accounts.id.revoke(login_hint , onRevokeCb)
}
export function cancelFlow(){
  const gapi = window.google;
  gapi.accounts.id.cancel()
}
export function storeCredential(Credential: any , callback: Function){
  const gapi = window.google;
  gapi.accounts.id.storeCredential(Credential, callback)
}
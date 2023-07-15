/* eslint-disable @typescript-eslint/ban-types */
import { useScript, ScriptLoadingState } from './hooks/useScript';
import { GAPI_FETCH_SRC } from './constants/platform';
import { useLayoutEffect, useRef } from 'react';
import { initializeGapiClient, renderButton, prompt, ClientInitializeOption, GsiButtonConfiguration } from './utils/oauth';

interface IdentityOptions extends ClientInitializeOption {
  defaultPrompt?: boolean;
  onPrompt? : Function;
  buttonRenderOption: GsiButtonConfiguration
}

const useGoogleIdentity = ({
  callback,
  defaultPrompt,
  clientId,
  onPrompt,
  autoSelect,
  loginURI ,
  cancelOnTapOutSide,
  itpSupport ,
  context ,
  nativeCallback,
  promptParentId,
  nonce,
  stateCookieDomain,
  uxMode,
  allowedParentOrigin,
  intermediateIframeCloseCallback,
  buttonRenderOption
}: IdentityOptions) => {
  const scriptState = useScript(GAPI_FETCH_SRC , true , false, false);
  const hostRef = useRef<HTMLDivElement>(null);

  const initializeOption = {
    itpSupport,
    intermediateIframeCloseCallback,
    allowedParentOrigin,
    uxMode,
    stateCookieDomain,
    nonce,
    promptParentId,
    cancelOnTapOutSide,
    callback,
    nativeCallback,
    loginURI,
    autoSelect,
    context,
    clientId
  }

  useLayoutEffect(() => {
    if (scriptState === ScriptLoadingState.READY && hostRef.current) {
      initializeGapiClient(initializeOption);
      renderButton(hostRef.current, buttonRenderOption);
      if(defaultPrompt){
        prompt(onPrompt)
      }
    }
  }, [scriptState, hostRef]);

  return {
    hostRef
  };
};

export default useGoogleIdentity;
//hook to add metas

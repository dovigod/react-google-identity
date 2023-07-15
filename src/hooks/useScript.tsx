/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from 'react';

export enum ScriptLoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  READY = 'ready',
  ERROR = 'error'
}

export const useScript = (src: string, setAsync: boolean, setDefer: boolean, permanent: boolean) => {
  const [status, setStatus] = useState<ScriptLoadingState>(src ? ScriptLoadingState.LOADING : ScriptLoadingState.IDLE);

  useLayoutEffect(() => {
    if (!src) {
      setStatus(ScriptLoadingState.IDLE);
      return;
    }

    let script: any = null;
    const setScriptStatus = (event: Event) => {
      script.setAttribute('data-status', event.type === 'load' ? ScriptLoadingState.READY : ScriptLoadingState.ERROR);

      if (event.type === 'load') {
        setStatus(ScriptLoadingState.READY);
      } else {
        setStatus(ScriptLoadingState.ERROR);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.src = src;

      if (setAsync) {
        script.async = true;
      }

      if (setDefer) {
        script.defer = true;
      }

      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
      script.addEventListener('load', setScriptStatus);
      script.addEventListener('error', setScriptStatus);
    }

    return () => {
      if (script && !permanent) {
        script.removeEventListener('load', setScriptStatus);
        script.removeEventListener('error', setScriptStatus);
        document.body.removeChild(script);
      }
    };
  }, [src, setAsync, setDefer, permanent]);

  return status;
};

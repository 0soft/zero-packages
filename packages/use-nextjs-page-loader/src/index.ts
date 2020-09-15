import { useState, useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';

export const NProgressStyleCreator = (color?: string) => createGlobalStyle`
/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${color ?? 'black'};
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${color ?? 'black'}, 0 0 5px ${color ?? 'black'};
  opacity: 1;
  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}
`;

export const usePageLoader = (delay: number = 200) => {
  const [timer, setTimer] = useState<number | undefined>();
  const routeChangeStart = () => {
    window.clearTimeout(timer);
    setTimer(window.setTimeout(NProgress.start, delay));
  };
  const routeChangeEnd = () => {
    window.clearTimeout(timer);
    NProgress.done();
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);
    NProgress.configure({
      showSpinner: false,
    });
    return () => {
      window.clearTimeout(timer);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  });
};

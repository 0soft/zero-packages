import * as React from 'react';
import Link from 'next/link';
import { UndecoratedLink } from '@edusig/zero-web/src';
import { isExternal } from '@edusig/zero-lib/src/web/external-url';

interface OwnProps {
  url: string;
}

export const UrlAction: React.FC<OwnProps> = ({ url, children }) => {
  return isExternal(url) ? (
    <UndecoratedLink href={url} target="_blank" rel="nofollow">
      {children}
    </UndecoratedLink>
  ) : (
    <Link href={url} passHref>
      <UndecoratedLink>{children}</UndecoratedLink>
    </Link>
  );
};

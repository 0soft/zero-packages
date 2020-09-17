import * as React from 'react';
import Link from 'next/link';
import { UndecoratedLink } from '@0soft/zero-web';
import { isExternal } from '@0soft/zero-lib';

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

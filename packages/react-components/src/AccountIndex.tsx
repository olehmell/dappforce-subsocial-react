// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountId, Address } from '@polkadot/types/interfaces';
import { DeriveAccountInfo } from '@polkadot/api-derive/types';
import { BareProps } from '@subsocial/react-api/types';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApi, useCall } from '@subsocial/react-hooks';

interface Props extends BareProps {
  children?: React.ReactNode;
  defaultValue?: string;
  label?: React.ReactNode;
  value?: string | AccountId | Address | null | Uint8Array;
}

function AccountIndex ({ children, className, defaultValue, label, style, value }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const info = useCall<DeriveAccountInfo>(api.derive.accounts.info, [value]);
  const [accountIndex, setAccountIndex] = useState<string | null>(null);

  useEffect((): void => {
    const { accountIndex } = info || {};

    if (accountIndex) {
      setAccountIndex(accountIndex.toString());
    }
  }, [info]);

  if (!api.query.indices) {
    return null;
  }

  return (
    <div
      className={`ui--AccountIndex ${className}`}
      style={style}
    >
      {label || ''}<div className='account-index'>{accountIndex || defaultValue || '-'}</div>{children}
    </div>
  );
}

export default React.memo(styled(AccountIndex)`
  .account-index {
    font-family: monospace;
  }
`);

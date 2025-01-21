import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@tomo-inc/tomo-evm-kit';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import type { SharedState } from '../../types/sharedState';

function useListenEvent() {
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    const msgHandler = ({ data }: any) => {
      const { type } = data;
      console.log('type', type);
      switch (type) {
        case 'openAccountModal':
          openAccountModal?.();
          break;
        case 'openChainModal':
          openChainModal?.();
          break;
        case 'openConnectModal':
          openConnectModal?.();
          break;
        default:
          console.error('unsupported method', type);
      }
    };
    window.addEventListener('message', msgHandler);
    return () => {
      window.removeEventListener('message', msgHandler);
    };
  }, [openAccountModal, openChainModal, openConnectModal]);
}

function useStateSync(state: SharedState) {
  const deps = Object.values(state);
  // biome-ignore lint/correctness/useExhaustiveDependencies: notify when value change
  useEffect(() => {
    window.parent?.postMessage(
      {
        type: 'iframe-state-change',
        state,
      },
      '*',
    );
  }, [...deps]);
}

const Page = () => {
  useListenEvent();

  const { accountModalOpen, openAccountModal } = useAccountModal();
  const { chainModalOpen, openChainModal } = useChainModal();
  const { connectModalOpen, openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { chain } = useAccount();

  useStateSync({
    accountModalOpen,
    openAccountModalAvailable: !!openAccountModal,
    chainModalOpen,
    openChainModalAvailable: !!openChainModal,
    connectModalOpen,
    openConnectModalAvailable: !!openConnectModal,
    chainName: chain?.name,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: initial behavior on mount
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) openConnectModal?.();
    window.parent.postMessage({ type: 'PIP-ready' }, '*');
    window.onbeforeunload = () => {
      disconnect();
    };
  }, []);

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
        overflow: 'hidden',
      }}
    >
      {/* <div>
        <h3 style={{ fontFamily: 'sans-serif' }}>Modal hooks</h3>
        <div style={{ display: 'flex', gap: 12, paddingBottom: 12 }}>
          <button
            disabled={!openConnectModal}
            onClick={openConnectModal}
            type="button"
          >
            {connectModalOpen ? 'Connect modal opened' : 'Open connect modal'}
          </button>
          <button
            disabled={!openChainModal}
            onClick={openChainModal}
            type="button"
          >
            {chainModalOpen ? 'Chain modal opened' : 'Open chain modal'}
          </button>
          <button
            disabled={!openAccountModal}
            onClick={openAccountModal}
            type="button"
          >
            {accountModalOpen ? 'Account modal opened' : 'Open account modal'}
          </button>
          <button
            disabled={!disconnect}
            onClick={disconnect}
            type="button"
          >
            disconnect
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Page;

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { blockdagPrimordial } from '../chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '0b397a880f3bc7a516a41df1483797aa';

const metadata = {
  name: 'GuardianBot',
  description: 'AI-powered blockchain security assistant',
  url: 'https://guardianbot.app',
  icons: ['https://guardianbot.app/favicon.ico']
};

export const config = defaultWagmiConfig({
  chains: [blockdagPrimordial],
  projectId,
  metadata,
});
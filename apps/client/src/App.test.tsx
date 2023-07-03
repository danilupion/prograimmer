import { RecoilRoot } from 'recoil';

import { render, screen } from '../utils/test-utils';

import App from './App';

describe('App', () => {
  it('Should show login form', async () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
  });
});

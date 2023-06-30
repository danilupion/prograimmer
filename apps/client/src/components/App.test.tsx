import { render, screen } from '../../utils/test-utils';

import App from './App';

describe('App', () => {
  it('Solution should not have files', async () => {
    render(<App />);
    expect(await screen.findByText(/No files loaded/i)).toBeInTheDocument();
  });

  it('Status should be ready', async () => {
    render(<App />);
    expect(await screen.findByText(/Ready/i)).toBeInTheDocument();
  });
});

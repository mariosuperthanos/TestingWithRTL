import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

// Testing more scenarios for different objects
describe('test that renders', () => {
  it('should render a text', () => {
    const user1: User = {
      id: 1,
      name: "David",
      isAdmin: false
    };
    render(<UserAccount user={user1}/>);

    const text = screen.getByText('David');
    expect(text).toBeInTheDocument();
  })

  it('should render if use is admin', () => {
    const user2: User = {
      id:1,
      name:"Mario",
      isAdmin:true
    }
    render(<UserAccount user={user2}/>)

    const verifyButton = screen.queryByRole('button');
    expect(verifyButton).toBeInTheDocument();
    expect(verifyButton).toHaveTextContent(/edit/i);
  })
  it('should not render if use is not admin', () => {
    const user3: User = {
      id:1,
      name:"Mario",
      isAdmin:false
    }
    render(<UserAccount user={user3}/>)

    const verifyButton = screen.queryByRole('button');
    expect(verifyButton).not.toBeInTheDocument();
  })
})


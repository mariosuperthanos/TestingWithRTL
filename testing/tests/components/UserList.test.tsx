import { render, screen } from '@testing-library/react'
import UserList from '../../src/components/UserList'
import { User } from '../../src/entities';

// Testing lists
describe('UserList', () => {
  it('should render no users when the users array is empty', () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });
  it('should render a list of users', () => {
    const users: User[] = [
      {
        id: 1,
        name: "Mario",
        isAdmin: false
      },
      {
        id: 2,
        name: "John",
        isAdmin: true
      },
      {
        id: 3,
        name: "Alice",
        isAdmin: false
      },
      {
        id: 4,
        name: "Sophia",
        isAdmin: true
      }
    ];
    render(<UserList users={users} />);

    users.forEach(user =>{
      const link = screen.getByRole('link', {name: user.name});
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`)
    });
  });
})
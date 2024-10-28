import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event';

// Testing event handlers
describe('TermsAndConditions', () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button')
    }
  }
  it('should render with corect text and initial state', () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Terms & Conditions');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  })

  it('should enable the button when the checkbox in checked', async() =>{
    // Arrange
    const { heading, checkbox, button } = renderComponent();

    // Act
    const user = userEvent.setup();
    await user.click(checkbox);
    
    // Assert
    expect(button).toBeEnabled();
  });
});
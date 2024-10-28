import { render, screen } from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event';
import exp from 'constants';

// Testing an expendable text + simplify the tests
describe('text', () => {
  it('should render the full short text', () => {
    const text = 'The short one';
    render(<ExpandableText text = {text}/>)

    const heading = screen.getByText(text);
    expect(heading).toBeInTheDocument();
  })

  it('should render the extendable long text', () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

    const truncatedText = text.substring(0,255)+'...';
    render(<ExpandableText text = {truncatedText}/>)

    const heading = screen.getByText(truncatedText);
    expect(heading).toBeInTheDocument();
  })

  it('should verify the event', async () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

    render(<ExpandableText text = {text}/>)

    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(text)).toBeInTheDocument();

    await user.click(button);

    const truncatedText = text.substring(0,255)+'...';
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
  })

  it('update', async() => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';
    const truncatedText = text.substring(0,255)+'...';

    render(<ExpandableText text = {text}/>)
    const user = userEvent.setup();
    const showMoreButton = screen.getByRole('button', {name: /more/i});

    await user.click(showMoreButton);

    const showLessButton = screen.getByRole('button', {name: /less/i})
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  })
})
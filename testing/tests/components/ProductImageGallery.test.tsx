import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';

// Testing an array of images by their attribute
describe('ProductImageGallery', () => {
  it('should render nothing if given an empty array', () => {
    // Destructuring { container } refers to the DOM element generated by the ProductImageGallery component
    const { container } = render(<ProductImageGallery imageUrls={[]}/>);
    expect(container).toBeEmptyDOMElement();
  })
  it('should render a list of images', () => {
    const imageUrls = ['url1', 'url2'];
    
    render(<ProductImageGallery imageUrls={imageUrls}/>);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    imageUrls.forEach((url, index)=>{
      expect(images[index]).toHaveAttribute('src', url);
    });
    expect(images[0]).toHaveAttribute('src', imageUrls[0]);
  })
})
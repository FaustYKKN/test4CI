import React, { Component } from 'react';
import '../../styles/image-text-section.css';
import page from 'epm-ui-boot/page';
import { Container, Row } from 'epm-ui-react';

class ImageTextSection extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      imageInView: false
    };
    this.handleImage = this.handleImage.bind( this );
  }

  componentDidMount() {
    this.handleImage();
    window.addEventListener( 'scroll', this.handleImage )
  }

  componentWillUnmount() {
    window.removeEventListener( 'scroll', this.handleImage );
  }

  handleImage () {

    const windowInViewHeight = document.documentElement.clientHeight || window.innerHeight;
    const executedHeight = window.scrollY + windowInViewHeight - this.section.offsetHeight / 4;

    if ( executedHeight >= this.section.offsetTop ) {
      this.setState( { imageInView: true } );
      window.removeEventListener( 'scroll', this.handleImage );
    }
  }

  render () {

    const { image, reverse, children } = this.props;
    const { imageInView } = this.state;

    return (
      <section className="imageTextSection" ref={ ( node ) => { this.section = node; } }>
        <Container type="fluid">
          <Row>
            <Row.Col size={ { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 } } push={ reverse ? {} : { xs: 0, sm: 0, md: 0, lg: 12, xl: 12 } } style={{ padding: 0 }}>
              <div className="textPartWrapper">
                { children }
              </div>
            </Row.Col>
            <Row.Col
              size={ { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 } }
              pull={ reverse ? {} : { xs: 0, sm: 0, md: 0, lg: 12, xl: 12 } }
              style={{
                height: 'auto',
                position: 'relative',
                overflowX: 'hidden',
                padding: '15px'
              }}
            >
              <div
                className={ `imagePart ${ reverse ? 'reverse' : '' } ${ imageInView ? 'inView' : '' }` }
                style={ {
                  // backgroundImage: `url(${page.basename}${image})`,
                  transition: 'transform 0.5s, opacity 1.5s',
                  transform: `translate( ${ reverse ? '' : '-' }15rem )`
                } }
              >
                <img
                  alt={ image }
                  src={ page.basename + image }
                  style={{ boxShadow: '#e7e7e7 -1px 1px 10px', borderRadius: '2px' }}
                />
              </div>
            </Row.Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default ImageTextSection;

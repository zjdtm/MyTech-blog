import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  grid-area: slide;
  height: 120%;
`;

const StyledSlidebar = styled(Slider)`
  width: 100%;
  height: 90%;
  overflow: hidden;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const NextArrow = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  right: 2%;
  z-index: 3;
`;

const PrevArrow = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 3;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Slide = () => {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextArrow>
        <Image src="/assets/img/next.png" alt="next" />
      </NextArrow>
    ),
    prevArrow: (
      <PrevArrow>
        <Image src="/assets/img/prev.png" alt="prev" />
      </PrevArrow>
    ),
  };

  return (
    <Container>
      <StyledSlidebar {...settings}>
        <div>
          <img
            src="/assets/img/slide1.gif"
            alt="slide1"
            style={{
              width: '100%',
              height: '70vh',
              objectFit: 'contain',
            }}
          />
        </div>
        <div>
          <img
            src="/assets/img/slide2.gif"
            alt="slide2"
            style={{
              width: '100%',
              height: '70vh',
              objectFit: 'contain',
            }}
          />
        </div>
        <div>
          <img
            src="/assets/img/slide3.gif"
            alt="slide3"
            style={{
              width: '100%',
              height: '70vh',
              objectFit: 'contain',
            }}
          />
        </div>
      </StyledSlidebar>
    </Container>
  );
};

export default Slide;

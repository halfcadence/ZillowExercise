import React, {useEffect, useState, useCallback} from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import JustifiedLayout from 'justified-layout';

import img0 from './assets/0.jpg';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.jpg';
import img8 from './assets/8.jpg';
import img9 from './assets/9.jpg';
import img10 from './assets/10.jpg';
import img11 from './assets/11.jpg';

import './index.scss';

const tabletBreakpoint = 600
const desktopBreakpoint = 960

const images = [
  {
    src: img0,
    aspectRatio: 5268 / 3512,
    caption: "An Image"
  },
  {
    src: img1,
    aspectRatio: 5004 / 3336,
    caption: "An Image"
  },
  {
    src: img2,
    aspectRatio: 6000 / 4000,
    caption: "An Image"
  },
  {
    src: img3,
    aspectRatio: 3264 / 2176,
    caption: "An Image"
  },

  {
    src: img4,
    aspectRatio: 2873 / 1915,
    caption: "An Image"
  },
  {
    src: img5,
    aspectRatio: 2579 / 1720,
    caption: "An Image"
  },
  {
    src: img6,
    aspectRatio: 6000 / 4000,
    caption: "An Image"
  },
  {
    src: img7,
    aspectRatio: 2971 / 1981,
    caption: "An Image"
  },
  {
    src: img8,
    aspectRatio: 4621 / 3081,
    caption: "An Image"
  },
  {
    src: img9,
    aspectRatio: 4928 / 3264,
    caption: "An Image"
  },
  {
    src: img10,
    aspectRatio: 6000 / 4000,
    caption: "An Image"
  },
  {
    src: img11,
    aspectRatio: 3469 / 2313,
    caption: "An Image"
  }
]

const App = () => (
  <div>
    <Gallery/>
  </div>
)

const Preview = ({closePreview, images, index, goBack, goForward}) => {
  const handleOnCloseClick = useCallback((e) => {
    e.stopPropagation()
		closePreview()
  }, [])

  const handleOnBackClick = useCallback((e) => {
      e.stopPropagation()
		  goBack()
  }, [index])

  const handleOnForwardClick = useCallback((e) => {
    e.stopPropagation()
		goForward()
  }, [index])

  return (
    <StyledPreview onClick={handleOnCloseClick}>
      <StyledPreviewImg onClick={(e) => e.stopPropagation()} src={images[index].src}/>
      <BackButton
        onClick={handleOnBackClick} 
        className="material-icons"
        >
        arrow_back
      </BackButton>
      <CloseButton
        onClick={handleOnCloseClick} 
        className="material-icons"
        >
        close
      </CloseButton>
      <ForwardButton
        onClick={handleOnForwardClick} 
        className="material-icons"
        >
        arrow_forward
      </ForwardButton>
    </StyledPreview>
  )
}

const Gallery = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState(0)

  const handleResize = useCallback(() => {
		setScreenWidth(window.innerWidth)
  }, [])
  useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
  }, [])

  const handleOnImageClick = useCallback((index) => {
    setPreviewVisible(true)
    setPreviewImage(index)
    document.documentElement.style.overflow = 'hidden'
    document.body.scroll = 'no'
  }, [])
  
  const handleOnClosePreview = useCallback((index) => {
    setPreviewVisible(false)
    document.documentElement.style.overflow = 'scroll'
    document.body.scroll = 'yes'
  }, [])

  const goBack = useCallback(() => {
		setPreviewImage(Math.max(0, previewImage - 1))
  }, [previewImage])
  const goForward = useCallback(() => {
    setPreviewImage(Math.min(images.length - 1, previewImage + 1))
  }, [previewImage])

  const padding = screenWidth < tabletBreakpoint ? 15 : screenWidth < desktopBreakpoint ? 25 : 40

  const config = {
    containerPadding: padding,
    containerWidth: screenWidth,
    boxSpacing: {
      horizontal: 15,
      vertical: 15
  }
  }

  const layoutGeometry = JustifiedLayout(images.map(img => img.aspectRatio), config)
  
  return <StyledGallery height={layoutGeometry.containerHeight}>
    {images.map((img, index) =>
      <StyledImg
        src={img.src}
        height={layoutGeometry.boxes[index].height}
        top={layoutGeometry.boxes[index].top}
        left={layoutGeometry.boxes[index].left}
        key={index}
        onClick={() => handleOnImageClick(index)}
        >
      </StyledImg>
    )}
    {previewVisible && <Preview
      images={images}
      index={previewImage}
      closePreview={handleOnClosePreview}
      goBack={goBack}
      goForward={goForward}
    />}
    </StyledGallery>
}

const buttonFontSize = 24;
const buttonMargin = 15;

const FixedButton = styled.i`
  position: fixed;
  font-size: ${buttonFontSize}px;
  color: white;
  background-color: rgba(60, 60, 60, 0.7);
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
`

const BackButton = styled(FixedButton)`
  left: ${buttonMargin}px;
  top: calc(50% - ${(buttonFontSize + buttonMargin)/2}px);
`

const ForwardButton = styled(FixedButton)`
  right: ${buttonMargin}px;
  top: calc(50% - ${(buttonFontSize + buttonMargin)/2}px);
`

const CloseButton = styled(FixedButton)`
  left: ${buttonMargin}px;
  top: ${buttonMargin}px;
`

const StyledPreviewImg = styled.img`
  background-color: transparent;
  max-height: 100%;
  max-width: 100%;
`
const StyledPreview = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;

  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledGallery = styled.div`
  height: ${props => props.height}px;
`
const StyledImg = styled.img`
  position: absolute;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: #F5F5F5;
`
render(<App />, document.getElementById('root'))

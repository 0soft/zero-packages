import * as React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

export interface OptimizedImageProps {
  /** Image's source path */
  src: any;
  /** Image's webp source path */
  srcWebp?: any;
  /** Alternative description for the image */
  alt?: string;
  /** Image tag title */
  title?: string;
  /** Image extension */
  ext?: string;
  /** Image width */
  width?: string;
  /** Image height */
  height?: string;
  /** Include the raw file directly (useful for SVG icons) */
  include?: boolean;
  /** Generate a low quality image placeholder */
  lqip?: boolean;
  /** Use traced outlines as loading placeholder */
  trace?: boolean;
  /** Resize an image */
  resize?: boolean;
  /** Is an amp page */
  amp?: boolean;
  /** Amp Image's layout */
  ampLayout?: 'responsive' | 'fixed';
  /** Custom classNames to put on the outermost tag */
  className?: string;
  /** Scales the image a little when the mouse hovers */
  zoomOnHover?: boolean;
  /** Enables lazy load. More details at: https://github.com/twobin/react-lazyload */
  lazy?: boolean;
  /** Base height for the lazy load element while not loaded */
  lazyHeight?: number | string;
  /** Once the lazy loaded component is loaded, do not detect scroll/resize event anymore. Useful for images or simple components */
  lazyOnce?: boolean;
  /** Offset to scroll before loading the image in pixels */
  lazyOffset?: number | number[];
}

const OptimizedImagePicture = styled.picture.attrs((attrs: any) => ({
  width: attrs.width,
  height: attrs.height,
  zoomonhover: attrs.zoomonhover,
}))`
  width: ${props => props.width};
  height: ${props => props.height};
  img {
    width: ${props => props.width};
    height: ${props => props.height};
    ${props =>
      props.zoomonhover &&
      `
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: scale(1.15);
      }
    `}
  }
`;

const OptimizedSVG = styled.div.attrs((attrs: any) => ({
  width: attrs.width,
  height: attrs.height,
}))`
  svg {
    width: ${props => (props.width != null ? props.width : 'inherit')};
    height: ${props => (props.height != null ? props.height : 'inherit')};
  }
`;

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  srcWebp,
  alt,
  title,
  ext,
  width,
  height,
  children,
  amp,
  ampLayout,
  className,
  zoomOnHover,
  lazy,
  lazyHeight,
  lazyOnce,
  lazyOffset,
  ...props
}) => {
  if (ext == null) {
    if (typeof src === 'string' && src.includes('.')) {
      ext = src.split('.').pop()!;
    } else if (typeof src === 'object' && src.hasOwnProperty('src') && src.src.includes('.')) {
      ext = src.src.split('.').pop()!;
    } else {
      // throw new Error('Extension was not provided and not identified in the image source');
      return null;
    }
  }

  if (amp) {
    return srcWebp != null ? (
      <amp-image
        alt={alt}
        width={width}
        height={height}
        src={props.resize ? srcWebp.src : srcWebp}
        srcSet={props.resize ? srcWebp.srcSet : null}
      >
        <amp-image
          alt={alt}
          width={width}
          height={height}
          src={props.resize ? src.src : src}
          srcSet={props.resize ? src.srcSet : null}
        ></amp-image>
      </amp-image>
    ) : (
      <amp-image
        alt={alt}
        width={width}
        height={height}
        src={props.resize ? src.src : src}
        srcSet={props.resize ? src.srcSet : null}
      ></amp-image>
    );
  }

  if (ext === 'svg') {
    if (props.include) {
      const inner = { __html: src };
      return (
        <OptimizedSVG
          dangerouslySetInnerHTML={inner}
          width={width}
          height={height}
          className={className}
          {...props}
        />
      );
    }
    if (props.trace) {
      const traceStyle = { backgroundImage: src.trace };
      return (
        <img
          src={src.src}
          style={traceStyle}
          width={width}
          height={height}
          alt={alt}
          title={title}
          className={className}
        />
      );
    }
  }

  const imgComponent = (
    <OptimizedImagePicture
      zoomonhover={zoomOnHover}
      width={width}
      height={height}
      className={className}
    >
      {srcWebp != null && (
        <source srcSet={props.resize ? srcWebp.srcSet : srcWebp} type="image/webp" />
      )}
      <source srcSet={props.resize ? src.srcSet : src} type={`image/${ext}`} />
      <img
        src={props.resize ? src.src : src}
        srcSet={props.resize ? src.srcSet : null}
        alt={alt || ''}
        title={title || ''}
      />
    </OptimizedImagePicture>
  );
  return lazy === true ? (
    <LazyLoad
      height={lazyHeight || height}
      resize={props.resize}
      once={lazyOnce}
      offset={lazyOffset}
    >
      {imgComponent}
    </LazyLoad>
  ) : (
    imgComponent
  );
};

export default OptimizedImage;

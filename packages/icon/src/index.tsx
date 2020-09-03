import * as React from 'react';
import MuiIcon from '@material-ui/core/Icon';
import { OptimizedImage } from '@0soft/optimized-image';
import styled from 'styled-components';

export interface IconProps {
  /** An URL (for SVG icons) or the unique icon identifer on Material UI
   *
   * Use the exact identification of the icon as displayed here:
   * https://material.io/resources/icons/?style=baseline
   *
   * The icon can also be prefixed with custom-<icon name>, this way we will
   * look for it on the customIconPath directory for the icon.
   */
  icon?: string | null | React.ReactNode;
  /** Alternative description for the icon */
  alt?: string;
  /** A custom className for that Icon */
  className?: string;
  size?: any;
}

export interface CustomIconProps {
  /** An URL (for SVG icons) or the unique icon identifer on Material UI
   *
   * Use the exact identification of the icon as displayed here:
   * https://material.io/resources/icons/?style=baseline
   *
   * The icon can also be prefixed with custom-<icon name>, this way we will
   * look for it on the customIconPath directory for the icon.
   */
  icon?: string | null | React.ReactNode;
  /** Icon width */
  width?: string;
  /** Icon height */
  height?: string;
  /** Alternative description for the icon */
  alt?: string;
  /** A custom className for that Icon */
  className?: string;
  size?: any;
  color?: string;
}

const CustomIcon = styled(MuiIcon).attrs((attrs: any) => ({
  size: attrs.size || '24px',
  color: attrs.color,
}))`
  font-size: ${props => props.size};
  color: ${props => (props.color != null ? props.color : 'inherit')};
`;

export const Icon: React.FC<IconProps> = ({ icon, size, className }) => {
  return (
    <CustomIcon className={className} size={size} fontSize={size != null ? 'inherit' : 'default'}>
      {icon}
    </CustomIcon>
  );
};

export const CustomIconHOC = (iconPath?: string): React.FC<CustomIconProps> => ({
  icon,
  alt,
  height,
  width,
  size,
  className,
}) => {
  if (iconPath != null && icon && typeof icon === 'string') {
    if (/^custom-/.exec(icon)) {
      icon = icon.replace('custom-', '') + '.svg';
      icon = require(`${iconPath}${icon}`);
    }

    if (icon != null && typeof icon === 'string') {
      if (/(^data:|^\/\/|^https:)/.exec(icon)) {
        return <OptimizedImage src={icon} alt={alt} height={height} width={width} ext="svg" />;
      }
    }
  }

  return (
    <CustomIcon
      color={color}
      className={className}
      size={size}
      fontSize={size != null ? 'inherit' : 'default'}
    >
      {icon}
    </CustomIcon>
  );
};

export default CustomIconHOC;

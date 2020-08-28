import * as React from 'react';
import MaskedInput from 'react-text-mask';

interface OwnProps {
  /** A reference to the input inside the mask field */
  inputRef: (ref: HTMLInputElement | null) => void;
}

/** Renders around a input field to apply a specific format of a phone number to it */
export const ZipcodeMask: React.FC<OwnProps> = ({ inputRef, ...other }) => (
  <MaskedInput
    {...other}
    ref={(ref: any) => inputRef(ref ? ref.inputElement : null)}
    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]}
  />
);

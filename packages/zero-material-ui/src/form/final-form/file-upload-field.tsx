import * as React from 'react';
import { Button, Chip, InputLabel, FormHelperText, FormControl } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Field, FieldInputProps, FieldMetaState } from 'react-final-form';
import styled from 'styled-components';
import AttachmentIcon from '@material-ui/icons/Attachment';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const DropzoneBox = styled.div.attrs((props: any) => ({
  height: props.height || '100px',
  meta: props.meta,
  disabled: props.disabled,
}))`
  display: flex;
  color: gray;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: dashed 2px ${props => (props.meta.touched && props.meta.error ? '#F44336' : '#bdbdbd')};
  width: 100%;
  height: ${props => props.height};
  position: relative;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  margin-top: 1.5rem;
`;

const UploadList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InsertDriveFileIconStyled = styled(InsertDriveFileIcon)`
  font-size: 4rem;
`;

const Label = styled(InputLabel)`
  transform: none;
`;

interface FileUploadProps {
  multiple?: boolean;
  label: string | React.ReactNode;
  height?: string;
  disabled?: boolean;
  dropLabel?: string;
  dragLabel?: string;
  buttonLabel?: string;
  accept?: string | string[];
  maxSize?: number;
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple,
  input,
  meta,
  label,
  height,
  disabled,
  dropLabel,
  dragLabel,
  buttonLabel,
  accept,
  maxSize,
}) => {
  const { getRootProps, getInputProps, open, acceptedFiles, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple,
    disabled,
    maxSize,
    accept,
  });
  React.useEffect(() => {
    const files = acceptedFiles.filter(
      it =>
        !multiple ||
        !Boolean(input.value && input.value.filter((i: File) => i.name === it.name).length)
    );
    input.onChange(multiple && input.value ? input.value.concat(files) : files);
  }, [acceptedFiles, input, multiple]);
  return (
    <FormControl error={Boolean(meta.touched && meta.error)} className="w-100">
      {label && <Label htmlFor="dropzone">{label}</Label>}
      <DropzoneBox
        {...getRootProps({ className: 'dropzone' })}
        height={height}
        meta={meta}
        disabled={disabled}
        id="dropzone"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{dropLabel}</p>
        ) : (
          <>
            <InsertDriveFileIconStyled />
            <p>{dragLabel}</p>
            <Button onClick={open} disabled={disabled} variant="contained" size="small">
              {buttonLabel}
            </Button>
          </>
        )}
      </DropzoneBox>
      {meta.touched && meta.error && <FormHelperText>{meta.touched && meta.error}</FormHelperText>}
      <UploadList>
        {input.value &&
          input.value.map((file: File, idx: number) => {
            return (
              <Chip
                icon={<AttachmentIcon />}
                label={file.name}
                className="my-3 mx-2"
                key={idx}
                onDelete={() => {
                  const files = input.value.filter((it: File) => it.name !== file.name);
                  input.onChange(files);
                }}
              />
            );
          })}
      </UploadList>
    </FormControl>
  );
};

interface FileUploadFieldBaseProps {
  name: string;
}

type FileUploadFieldProps = FileUploadFieldBaseProps & Omit<FileUploadProps, 'input' | 'meta'>;

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  label,
  disabled,
  multiple,
  height,
  maxSize,
  dropLabel = 'Drop the files here...',
  dragLabel = 'Drag the file here or',
  buttonLabel = 'Click here',
  accept,
}) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        return (
          <FileUpload
            label={label}
            disabled={disabled}
            multiple={multiple}
            height={height}
            maxSize={maxSize}
            dropLabel={dropLabel}
            dragLabel={dragLabel}
            buttonLabel={buttonLabel}
            accept={accept}
            input={input}
            meta={meta}
          />
        );
      }}
    />
  );
};

export default FileUploadField;

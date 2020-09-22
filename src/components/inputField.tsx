import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  Tooltip,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { useState } from "react";

type inputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
  iconName?: any;
  tooltip?: string;
};

const InputField: React.FC<inputFieldProps> = ({
  iconName,
  size: _,
  tooltip,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [toolStatus, setToolStatus] = useState(false);
  return (
    <Tooltip
      aria-label={`${props.placeholder} should be in the format`}
      label={tooltip}
      hasArrow
      placement="right-end"
      isOpen={toolStatus}
    >
      <FormControl isInvalid={!!error} marginY="1rem">
        <FormLabel
          paddingLeft="2.5rem"
          htmlFor={props.name}
          textTransform="uppercase"
          fontSize={14}
          fontWeight="bold"
        >
          {props.label}
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            children={<Icon name={iconName} color="gray.300" />}
          />
          <Input
            {...field}
            {...props}
            id={props.name}
            placeholder={props.placeholder}
            borderRadius=".5rem"
            border="2px"
            fontFamily="inherit"
            onFocus={() => {
              if (tooltip) setToolStatus(true);
            }}
            onBlur={() => setToolStatus(false)}
          />
        </InputGroup>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Tooltip>
  );
};
export default InputField;

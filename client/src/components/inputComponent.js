import { Button, HStack, Input } from "@chakra-ui/react";
import React from "react";

const InputComponent = (props) => {
  return (
    <HStack>
      <Input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.handlerInput(e);
        }}
      />
      {props.showButton && (
        <Button bg="#C2C693" onClick={props.handlerButton}>
          {props.buttonText}
        </Button>
      )}
    </HStack>
  );
};

export default InputComponent;

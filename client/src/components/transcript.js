import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import InputComponent from "./inputComponent";
import SearchFilter from "./searchFilter";

const Transcript = ({ analysisInfo }) => {
  const [buttonType, setButtonType] = useState(1);
  const [originalResultData, setOriginalResultData] = useState([]);
  const [filterResultData, setFilterResultData] = useState([]);
  const [email, setEmail] = useState("");
  console.log("analysisinfo", analysisInfo);
  useEffect(() => {
    setOriginalResultData(analysisInfo["iab_categories_result"]["results"]);
  }, [analysisInfo]);

  useEffect(() => {
    setFilterResultData(originalResultData);
  }, [originalResultData]);

  const handleEmailSend = async () => {
    let response;

    response = await fetch("http://localhost:5000/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toEmail: email }),
    });
    let json = await response.json();
    console.log(json);
    setEmail("");
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container minWidth="container.md">
      <VStack>
        <HStack mb="4">
          <Button bg="#C2C693" onClick={() => setButtonType(1)}>
            Summary
          </Button>
          <Button bg="#C2C693" onClick={() => setButtonType(2)}>
            Transcript
          </Button>
          <SearchFilter
            originalList={originalResultData}
            setFilteredList={setFilterResultData}
          />
          <InputComponent
            value={email}
            placeholder={"Enter email to send copy..."}
            setValue={setEmail}
            handlerButton={handleEmailSend}
            buttonText={"Send"}
            handlerInput={handleEmailInput}
            showButton={true}
          />
        </HStack>
        {buttonType === 1 && (
          <Box p="4" border="1px" borderRadius={"md"}>
            {analysisInfo["chapters"].map((item) => {
              return (
                <>
                  <Box>
                    <Heading color="#33658A">{item["gist"]}</Heading>
                    <Text>{item["summary"]}</Text>
                  </Box>
                  <br />
                </>
              );
            })}
          </Box>
        )}

        {buttonType === 2 && (
          <Box border="1px" p="4" borderRadius={"md"}>
            {filterResultData.map((item) => {
              const list = item["labels"][0]["label"].split(">");
              return (
                <>
                  <VStack>
                    <Text>{item["text"]}</Text>
                    <HStack>
                      {list.map((topic) => {
                        return (
                          <>
                            <Button bg="#7DA5BE" color="white">
                              #{topic}
                            </Button>
                          </>
                        );
                      })}
                    </HStack>
                  </VStack>
                  <br />
                </>
              );
            })}
            <br />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Transcript;

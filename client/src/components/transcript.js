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
          <Button bg="#C2C693" onClick={() => setButtonType(3)}>
            Emotional analysis
          </Button>
          <SearchFilter
            originalList={originalResultData}
            setFilteredList={setFilterResultData}
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
        {buttonType === 3 && (
          <Box border="1px" p="4" borderRadius={"md"}>
            {analysisInfo["sentiment_analysis_results"].map((item) => {
              //const list = item["sentiment"];
              return (
                <>
                  <VStack>
                    <Text>{item["sentiment"]}</Text>
                    <HStack>
                      <Text>{item["text"]}</Text>
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

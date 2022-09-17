import React, { useState, useEffect } from "react";
import UploadImage from "./components/uploadImage";
import Transcript from "./components/transcript";
import bg from "./Assets/bg2.png";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
const Video = () => {
  const [analysisInfo, setAnalysisInfo] = useState(undefined);

  useEffect(() => {
    console.log(analysisInfo);
  }, [analysisInfo]);
  return (
    <Box>
      <Box w={"full"} h={"100vh"}>
        <Box>
          <Container maxW={"container.md"} p="4" centerContent={"true"}>
            <VStack spacing="25px" mt="10">
              <Heading size="3xl" color="#805858" mt="10">
                Video Sum
              </Heading>
              {!analysisInfo ? (
                <UploadImage
                  setAnalysisInfo={setAnalysisInfo}
                  analysisInfo={analysisInfo}
                />
              ) : (
                <Transcript analysisInfo={analysisInfo} />
              )}
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Video;

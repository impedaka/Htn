import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const UploadImage = ({ setAnalysisInfo, analysisInfo }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleAnalyze = async (path) => {
    setLoadingMessage("Analyzing Video");
    // Fetch the analysis
    let response = await fetch("http://localhost:5000/assemblyAI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: path }),
    });
    let json = await response.json();
    setAnalysisInfo(json);
    setLoading(false);
  };

  const handleYoutubeLink = async () => {
    let response;
    let json;

    setLoadingMessage("Uploading Video");
    setLoading(true);

    //Post email and password to back end and get authenticated
    response = await fetch("http://localhost:5000/upload/youtube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link,
      }),
    });

    json = await response.json();
    console.log(json.message);
    handleAnalyze(json.message);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    let response;
    let json;

    setLoadingMessage("Uploading Video");
    setLoading(true);

    let file = e.target.files[0];
    console.log(e.target.files[0]);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("filename", "attachment");

    response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    json = await response.json();
    console.log(json.message);
    handleAnalyze(json.message);
  };

  return (
    <>
      <Text fontSize="2xl">
        Connect your video/lecture via link or file upload.
      </Text>
      <Box bg="#7DA5BE" borderRadius={"md"} p="8" minW="500px">
        <VStack spacing="25px">
          {!loading && (
            <>
              <>
                <Text color="white" fontSize="xl">
                  Video Link
                </Text>
                <Input
                  bg="white"
                  type="text"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
              </>
              {!link && (
                <Box>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".mp4"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </Box>
              )}
            </>
          )}
          {loading && (
            <Box>
              <Text color="white">{loadingMessage}</Text>
            </Box>
          )}
        </VStack>
      </Box>
      {!loading && (
        <Button bg="#C2C693" onClick={handleYoutubeLink}>
          Submit
        </Button>
      )}
      {analysisInfo && <div></div>}
    </>
  );
};

export default UploadImage;

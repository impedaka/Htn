import {Button, Link} from "@chakra-ui/react";
import React from "react";
import image from './Assets/img.png';


const Diaries = () => {
    return (
        <div>
            <img src={image} alt="BigCo Inc. logo"/>
            <h1 style={{
                position: "absolute",
                width: "465px",
                height: "96px",
                left: "678px",
                top: "397px",
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "60px",
                lineHeight: "160%"
            }}>Hello, I'm Soul</h1>

            <p style={{
                position: "absolute",
                width: "670px",
                height: "96px",
                left: "678px",
                top: "488px",
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "60px",
                lineHeight: "160%"
            }}><em>I'm so glad you're here</em></p>

        </div>
    );
};

export default Diaries;
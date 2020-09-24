import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { BiUpArrow } from "react-icons/bi";
import dateFormat from "../utils/postDateFormat";

interface featureProps {
  title: String;
  desc: String;
  createdAt: string;
  points: Number;
  username: string;
}

const Feature: React.FC<featureProps> = ({
  title,
  desc,
  createdAt,
  points,
  username,
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius=".5rem">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="l" fontFamily="Inter">
          {title}
        </Heading>
        <Text>{username}</Text>
      </Flex>
      <Text mt={4} fontFamily="Inter">
        {desc}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" marginTop={5}>
        <Flex alignItems="center" justifyContent="center">
          <Box as={BiUpArrow} size="20px" marginRight={3} />
          <Text>{points}</Text>
          <Box
            as={BiUpArrow}
            size="20px"
            marginLeft={3}
            transform="rotate(180deg)"
          />
        </Flex>
        <Text>{dateFormat(createdAt)}</Text>
      </Flex>
    </Box>
  );
};
export default Feature;

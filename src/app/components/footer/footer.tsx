"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from "@chakra-ui/react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      as="footer"
      bottom={0}
      left={0}
      right={0}
      bg="#ffff"
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image src="/logo.png" alt="Logo" boxSize="30px" />
        <Text color={"pink.400"}>© 2024 @mnajmytsss. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"GitHub"} href={"https://github.com/mnajmytsss"}>
            <FaGithub />
          </SocialButton>
          <SocialButton
            label={"LinkedIn"}
            href={
              "https://www.linkedin.com/in/muhammad-najmy-tsaqiby-1b4561173/"
            }
          >
            <FaLinkedin />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/mnajmytsss/"}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

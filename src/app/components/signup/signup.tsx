/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter dari Next.js
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData
      );
      console.log(response.data);
      setIsLoading(true);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/signin");
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
      toast({
        title: "Registration Failed",
        description: "An error occurred while registering. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSignup();
  };

  return (
    <Flex justify="center" align="center" minH="100vh">
      <form onSubmit={handleSubmit}>
        <Flex
          direction="column"
          p={8}
          rounded={6}
          boxShadow="lg"
          maxW="400px"
          w="100%"
        >
          <Heading mb={6}>Register</Heading>
          <FormControl id="name" isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              width="100%"
            />
          </FormControl>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              width="100%"
            />
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              width="100%"
            />
          </FormControl>
          <Button
            type="submit"
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            isLoading={isLoading}
          >
            Register
          </Button>
          <Text mt={4} textAlign="center" fontSize="sm" color="gray.600">
            Don't have an account?{" "}
            <Link color={"pink.400"} onClick={() => router.push("/signin")}>
              Sign In
            </Link>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default RegisterForm;

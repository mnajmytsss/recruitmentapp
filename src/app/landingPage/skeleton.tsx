import {
  Button,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";

const LandingPageSkeleton = () => {
  return (
    <Flex direction="column" align="center" p={6} mt="80px" mb={10} minH="80vh">
      <Heading
        as="h1"
        color="black"
        fontSize="lg"
        fontWeight="bold"
        mt={"20px"}
        mb={8}
      >
        <Skeleton height="20px" width="200px" />
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        width="100%"
        maxW="800px"
      >
        {[...Array(4)].map((_, index) => (
          <GridItem key={index}>
            <Stack spacing={2}>
              <Skeleton height="20px" width="200px" />
              <Skeleton height="20px" width="300px" />
              <Skeleton height="20px" width="300px" />
              <Skeleton height="20px" width="300px" />
              <Skeleton height="40px" width="100px" alignSelf="flex-end" />
            </Stack>
          </GridItem>
        ))}
      </Grid>
      <Flex mt={4}>
        <Button isLoading bg="gray.200" mr={2}>
          Previous
        </Button>
        <Button isLoading bg="gray.200" ml={2}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingPageSkeleton;

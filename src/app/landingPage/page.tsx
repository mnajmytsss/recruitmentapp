"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChakraProvider,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
  Grid,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "@/app/components/layout/layout";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { CareerInterface } from "@/app/types";
import { SessionProvider } from "next-auth/react";
import LandingPageSkeleton from "./skeleton";

const LandingPage = () => {
  const router = useRouter();
  const [pekerjaanList, setPekerjaanList] = useState<CareerInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/career/getAllPekerjaan"
        );
        setPekerjaanList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (_id: string) => {
    router.push(`/jobDetail?id=${_id}`);
  };

  const totalPages = Math.ceil(pekerjaanList.length / perPage);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = pekerjaanList.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderTable = (title: string, values: string[]) => {
    return (
      <Table variant="simple" width="100%">
        <Tbody>
          <Td fontWeight="bold" width="30%" fontSize="sm">
            {title}:
          </Td>
          <Td>
            {values.slice(0, 2).map((value, index) => (
              <div key={index}>
                <Text fontSize="sm">{`${index + 1}. ${value}`}</Text>
              </div>
            ))}
          </Td>
        </Tbody>
      </Table>
    );
  };

  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
          <Flex direction="column" align="center" p={6} mt="80px" minH="80vh">
            <Heading
              as="h1"
              color="black"
              fontSize="lg"
              fontWeight="bold"
              mt={"20px"}
              mb={8}
            >
              Lowongan Pekerjaan
            </Heading>
            {loading ? (
              <LandingPageSkeleton />
            ) : (
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={6}
                width="100%"
                maxW="800px"
              >
                {currentPosts.map((pekerjaan) => (
                  <GridItem key={pekerjaan._id}>
                    <Stack spacing={2}>
                      <Text fontSize="md" fontWeight="bold">
                        {pekerjaan.pekerjaan}
                      </Text>
                      {renderTable(
                        "Deskripsi",
                        pekerjaan.deskripsi.toString().split(",")
                      )}
                      {renderTable(
                        "Kualifikasi",
                        pekerjaan.kualifikasi.toString().split(",")
                      )}
                      {renderTable(
                        "Tanggung Jawab",
                        pekerjaan.tanggungJawab.toString().split(",")
                      )}
                      {renderTable(
                        "Manfaat",
                        pekerjaan.manfaat.toString().split(",")
                      )}
                      <Button
                        onClick={() => handleDetailClick(pekerjaan._id)}
                        bg={"pink.400"}
                        size="sm"
                        alignSelf="flex-end"
                      >
                        Lihat Detail
                      </Button>
                    </Stack>
                  </GridItem>
                ))}
              </Grid>
            )}
            <Flex mt={4}>
              <Button
                disabled={currentPage === 1}
                onClick={prevPage}
                mr={2}
                leftIcon={<ChevronLeftIcon />}
              >
                Previous
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={nextPage}
                ml={2}
                rightIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            </Flex>
          </Flex>
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default LandingPage;

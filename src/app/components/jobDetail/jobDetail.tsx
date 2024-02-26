/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
Th,
  Thead,
  Tr,
  Button,
Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CareerInterface } from "@/app/types";
import { useSession } from "next-auth/react";

const JobDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const _idParam = searchParams.get("id");

  console.log(session);

  if (!_idParam) {
    console.error("_id tidak ditemukan pada URL.");
  } else {
    const _id: string = _idParam;
    console.log("Nilai _id:", _id);
  }

  const [jobDetail, setJobDetail] = useState<CareerInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/career/getPekerjaanById?id=${_idParam}`
        );
        setJobDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };

    if (_idParam) {
      fetchJobDetail();
    }
  }, [_idParam]);

  const handleApply = async () => {
    const jobId = jobDetail?._id;

    if (!jobId) {
      console.error("Tidak dapat melamar pekerjaan: id tidak tersedia.");
      return;
    }

    const data = {
      email: session?.data?.user?.email,
      jobId: jobId,
      jobTitle: jobDetail?.pekerjaan,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/lamaran/lamarPekerjaan",
        data
      );
      console.log("Permohonan lamaran berhasil dikirim:", response.data);

      router.push("/landingPage");

      toast.success("Pekerjaan berhasil dilamar!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Gagal mengirim permohonan lamaran:", error);

      toast.error("Gagal melamar pekerjaan. Silakan coba lagi!", {
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.md" p={6} mt={12} mb={10} minH="80vh">
        <Heading as="h1" color="black" fontSize="xl" fontWeight="bold">
          <Skeleton height="30px" width="60%" />
        </Heading>
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Detail</Th>
              <Th></Th>
          </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={2}>
            <Skeleton height="20px" />
          </Td>
          </Tr>
            <Tr>
              <Td colSpan={2}>
            <Skeleton height="20px" />
          </Td>
          </Tr>
            <Tr>
              <Td colSpan={2}>
            <Skeleton height="20px" />
          </Td>
        </Tr>
          </Tbody>
        </Table>
        <Button
          isLoading
          loadingText="Loading"
          bg={"pink.400"}
          size="sm"
          alignSelf="flex-end"
          mt={4}
          onClick={handleApply}
        >
          Lamar pekerjaan
        </Button>
      </Container>
    );
  }

  if (!jobDetail) {
    return <div>Job detail not found</div>;
  }

  const renderTable = (title: string, values: string[]) => {
    return (
      <Table variant="simple" width="100%">
        <Tbody>
          <Tr>
            <Td fontWeight="bold" width="30%" fontSize="sm">
              {title}:
            </Td>
            <Td>
              {values.slice().map((value, index) => (
                <div key={index}>
                  <Text fontSize="sm">{`${index + 1}. ${value}`}</Text>
                </div>
              ))}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  };

  return (
    <Container
      maxW="container.md"
      p={6}
      mt={12}
      mb={10}
      overflow="hidden"
      minH="80vh"
    >
      <Heading as="h1" color="black" fontSize="xl" fontWeight="bold">
        {jobDetail.pekerjaan}
      </Heading>
        <>
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Detail</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  {renderTable(
                    "Deskripsi",
                    jobDetail.deskripsi.toString().split(",")
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {renderTable(
                    "Kualifikasi",
                    jobDetail.kualifikasi.toString().split(",")
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {renderTable(
                    "Tanggung Jawab",
                    jobDetail.tanggungJawab.toString().split(",")
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {renderTable(
                    "Manfaat",
                    jobDetail.manfaat.toString().split(",")
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Button
            onClick={handleApply}
            bg={"pink.400"}
            size="sm"
            alignSelf="flex-end"
            mt={4}
          >
            Lamar pekerjaan
          </Button>
        </>
    </Container>
  );
};

export default JobDetailPage;

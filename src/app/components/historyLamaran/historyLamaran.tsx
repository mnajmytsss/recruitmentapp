import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Box,
  Text,
  Spinner,
  Skeleton,
  Badge,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Lamaran {
  jobTitle: string;
  status: string;
  appliedAt: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "orange";
    case "interview_hr":
      return "blue";
    case "interview_user":
      return "purple";
    case "offering":
      return "green";
    case "rejected":
      return "red";
    case "not_continued":
      return "gray";
    default:
      return "gray";
  }
};

const LamaranTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appliedJobs, setAppliedJobs] = useState<Lamaran[]>([]);

  useEffect(() => {
    const fetchLamarans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/lamaran/historyLamaran"
        );
        setAppliedJobs(response.data.appliedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setLoading(false);
      }
    };

    fetchLamarans();
  }, []);

  if (loading) {
    // Skeleton loading
    return (
      <Container maxW="container.md" mt="100px" minH="74vh" mb={10}>
        <Grid
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={4}
        >
          {[...Array(4)].map((_, index) => (
            <Box
              key={index}
              bg="white"
              boxShadow="md"
              p={4}
              borderRadius="md"
              borderWidth="1px"
            >
              <Skeleton height="20px" mb={2} />
              <Skeleton height="20px" width="60%" mb={2} />
              <Skeleton height="20px" width="50%" />
            </Box>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" mt="100px" minH="74vh" mb={10}>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
        {appliedJobs.map((lamaran, index) => (
          <Box
            key={index}
            bg="white"
            boxShadow="md"
            p={4}
            borderRadius="md"
            borderWidth="1px"
          >
            <Text fontWeight="bold" mb={2}>
              {lamaran.jobTitle}
            </Text>
            <Badge colorScheme={getStatusColor(lamaran.status)} mb={2}>
              {lamaran.status}
            </Badge>
            <Text fontSize="sm">Applied At: {lamaran.appliedAt}</Text>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default LamaranTable;

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [editableField, setEditableField] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (status === "authenticated") {
          const response = await axios.get(
            "http://localhost:3000/api/users/getUserById",
            {
              params: { id: session?.user?._id },
            }
          );
          setUserProfile(response.data.user);
        }
        console.log(session);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [session, status]);

  const handleEdit = (field: string, value: string | undefined) => {
    setEditableField(field);
    setEditedValue(value || "");
  };

  const handleSave = async () => {
    try {
      if (session && session.user) {
        const updatedData = { ...userProfile };
        updatedData[editableField as string] = editedValue;

        const response = await axios.put(
          "http://localhost:3000/api/users/updateProfile?id=" +
            session.user._id,
          updatedData
        );

        setUserProfile(response.data.user);
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setEditableField(null);
    setEditedValue(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditedValue(e.target.files[0].name);
    }
  };

  const handleTextChange = (newValue: string, key: string) => {
    setUserProfile((prevProfile: any) => ({
      ...prevProfile,
      biodata: {
        ...prevProfile.biodata,
        [key]: newValue,
      },
    }));
  };

  return (
    <Flex
      justify="center"
      align="center"
      p={6}
      mt="80px"
      mb={10}
      overflow="hidden"
      minH="80vh"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        maxW="800px"
      >
        <GridItem colSpan={2}>
          <Flex justify="center">
            <Skeleton isLoaded={userProfile} height="150px" width="150px">
              <Image
                src={userProfile?.picture || ""}
                alt={userProfile?.name || ""}
                boxSize="150px"
                borderRadius="full"
                rounded="lg"
                fallback={<MdAccountCircle size="150px" />}
              />
            </Skeleton>
            <Flex justify="flex-end" mt={-6} mr={20}>
              <label htmlFor="picture-upload">
                <IconButton
                  as="span"
                  aria-label="Edit"
                  icon={<BiPencil />}
                  variant="ghost"
                />
              </label>
              <input
                id="picture-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={2}>
          <Skeleton isLoaded={userProfile}>
            <Text
              fontWeight="bold"
              fontSize="xl"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {editableField === "name" ? (
                <Flex>
                  <input
                    type="text"
                    value={editedValue || ""}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  <IconButton
                    aria-label="Save"
                    icon={<IoMdCheckmark />}
                    onClick={handleSave}
                    variant="ghost"
                  />
                </Flex>
              ) : (
                <>
                  {userProfile?.name}
                  <IconButton
                    aria-label="Edit"
                    icon={<BiPencil />}
                    onClick={() => handleEdit("name", userProfile?.name)}
                    variant="ghost"
                  />
                </>
              )}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={userProfile}>
            <Text
              fontSize="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {editableField === "email" ? (
                <Flex>
                  <input
                    type="text"
                    value={editedValue || ""}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  <IconButton
                    aria-label="Save"
                    icon={<IoMdCheckmark />}
                    onClick={handleSave}
                    variant="ghost"
                  />
                </Flex>
              ) : (
                <>
                  {userProfile?.email}
                  <IconButton
                    aria-label="Edit"
                    icon={<BiPencil />}
                    onClick={() => handleEdit("email", userProfile?.email)}
                    variant="ghost"
                  />
                </>
              )}
            </Text>
          </Skeleton>
        </GridItem>
        {userProfile &&
          userProfile.biodata &&
          Object.entries(userProfile.biodata).map(([key, value]) => (
            <GridItem key={key}>
              <Skeleton isLoaded={userProfile}>
                <Text fontWeight="bold">{key}</Text>
              </Skeleton>
              <Skeleton isLoaded={userProfile}>
                <Text
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {editableField === key ? (
                    <Flex>
                      {key === "cv" || key === "suratLamaran" ? (
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.docx"
                        />
                      ) : (
                        <input
                          type="text"
                          value={(value as string) || ""}
                          onChange={(e) =>
                            handleTextChange(e.target.value, key)
                          }
                        />
                      )}
                      <IconButton
                        aria-label="Save"
                        icon={<IoMdCheckmark />}
                        onClick={handleSave}
                        variant="ghost"
                      />
                    </Flex>
                  ) : (
                    <>
                      {value}
                      <IconButton
                        aria-label="Edit"
                        icon={<BiPencil />}
                        variant="ghost"
                        onClick={() => handleEdit(key, value as string)}
                      />
                    </>
                  )}
                </Text>
              </Skeleton>
            </GridItem>
          ))}
      </Grid>
    </Flex>
  );
};

export default Profile;

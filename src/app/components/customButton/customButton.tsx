import { Button, ButtonProps } from "@chakra-ui/react";

const CustomButton = ({
  children,
  onClick,
  href,
  sx,
  ...rest
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  sx?: ButtonProps["sx"];
  rest?: any;
}) => {
  return (
    <Button
      as={href ? "a" : "button"}
      onClick={onClick}
      {...(href && { href: href })} 
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      _hover={{
        bg: "pink.300",
      }}
      sx={sx} 
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

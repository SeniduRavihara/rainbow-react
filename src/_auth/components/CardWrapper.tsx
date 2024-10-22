import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import BackButton from "./BackButton";
import Header from "./Header";
import Social from "./Social";
// import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {


  return (
    <Card className="xsm:w-[400px] w-[350px] shadow-md backdrop-blur-xl bg-white/60">
      <CardHeader className="text-center">
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex justify-between -mt-5">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>

      {/* <Box position="relative" padding="5" className="-mt-10">
        <Divider colorScheme="red" className="border" />
        <AbsoluteCenter bg="white" px="4" className="text-muted-foreground">
          or
        </AbsoluteCenter>
      </Box> */}

      {showSocial && (
        <CardFooter className="flex justify-between">
          <Social />
        </CardFooter>
      )}
    </Card>
  );
};
export default CardWrapper;

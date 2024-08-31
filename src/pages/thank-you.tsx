import { Button, Container } from "@mui/material";
import { useState } from "react";
import ThankYouPopupV2 from "../components/thankYouPopUp/ThankYouPopupV2";

const ThankYou = () => {
  const [modal, setModal] = useState(false);

  const showThankYou = () => {
    setModal(true);
  };
  return (
    <>
      <Container className="p-4" maxWidth="sm">
        <Button variant="outlined" onClick={showThankYou}>
          Show Thank You
        </Button>

        <ThankYouPopupV2 visible={modal} />
      </Container>
    </>
  );
};

export default ThankYou;

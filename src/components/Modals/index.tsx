import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const ImageContainer = styled.div`
  width: 70px;
`;

interface PopoverProps {
  image: string;
  title: string;
  description: React.ReactNode;
}

export default function ImagePopover(props: PopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ImageContainer>
          <img
            src={props.image}
            alt={props.title}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </ImageContainer>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography
          sx={{
            p: 3,
            bgcolor: "#192125",
            color: "white",
            maxWidth: "500px",
            display: "inline-flex",
            // borderRadius: "10px",
          }}
        >
          <div>{props.description}</div>
        </Typography>
      </Popover>
    </>
  );
}

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const ImageContainer = styled.div`
  width: 70px;
  img {
    maxwidth: auto;
    height: auto;
  }
`;

const PopoverContent = styled(Typography)`
  p: 3;
  bgcolor: #192125;
  color: white;
  maxwidth: 500px;
  display: inline-flex;
`;

interface PopoverProps {
  image: string;
  title: string;
  description: React.ReactNode;
}

export default function ImagePopover({
  image,
  title,
  description,
}: PopoverProps) {
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
      <div
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ImageContainer>
          <img src={image} alt={title} style={{ maxWidth: "70px" }} />
        </ImageContainer>
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
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
        <PopoverContent>
          <div>{description}</div>
        </PopoverContent>
      </Popover>
    </>
  );
}

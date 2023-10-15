import { styled } from "@mui/system";
import { Input } from "@mui/joy";
import Column from "./Column";

export const Box = styled("div")({
  width: "100%",
  maxHeight: "70px",
  display: "flex",
  flexDirection: "row",
  marginBottom: "10px",
  backgroundColor: "#1A2025",
  borderRadius: "8px", // Retaining the hint of curvature
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a subtle shadow for depth
});

export const SubBox = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
});

export const Title = styled("div")({
  width: "130px",
  justifyContent: "flex-start",
});

export const InfoContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  // width: "45%",
});

export const CustomInput = styled(Input)({
  backgroundColor: "#625f63",
  width: "6px",
});

export const ImageContainer = styled("div")({
  width: "70px",
});

export const ResourceContainer = styled(Column)({
  minWidth: "50px",
  textAlign: "left",
  gap: "3px",
});

export const ResourceTitle = styled("div")({
  color: "grey",
  fontWeight: 700,
  fontSize: "12px",
  "@media (max-width: 1300px)": {
    display: "none",
  },
});

export const NumberContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
  gap: "4px",
  alignItems: "center",
  fontSize: "14px",
  lineHeight: "18.2px",
});

export const ButtonContainer = styled("div")({
  maxWidth: "300px",
  minWidth: "195px",
  paddingLeft: "3%",
  "&:hover": {
    filter: "brightness(0.75)",
  },
  "@media (min-width: 1000px)": {
    width: "300px",
  },
});

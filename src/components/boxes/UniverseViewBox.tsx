import * as Styled from "../../shared/styled/Box";
import debris from "../../assets/uiIcons/debris.svg";

interface Props {
  img: string;
  owner?: string;
  functionCallName?: string;
  position?: number;
  debris?: { steel: number; quartz: number };
  points?: number;
}

const UniverseViewBox = ({
  img,
  position,
  owner, //   functionCallName,
  points, //   debris,
}: Props) => {
  return (
    <Styled.Box>
      <Styled.ImageContainer>
        <img
          src={img}
          alt={"Empty Position"}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>PLAYER</Styled.ResourceTitle>
            <Styled.NumberContainer>{owner}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POINTS</Styled.ResourceTitle>
            <Styled.NumberContainer>{points}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POSITION</Styled.ResourceTitle>
            <Styled.NumberContainer>{position}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ImageContainer>
            <img
              src={debris}
              alt={"no debris"}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Styled.ImageContainer>
        </Styled.InfoContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default UniverseViewBox;

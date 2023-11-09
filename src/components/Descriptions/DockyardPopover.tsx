import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: justify;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TextBox = styled.p`
  font-size: 15px;
  // padding-left: 5px;
`;

// const FloatImage = styled.img`
//     float: left; /* Change to 'right' to float the image to the right */
//     margin: 10px;
//     width: 200px; /* Adjust as needed */
//     height: 200px; /* Adjust as needed */
// `;

export function CarrierDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Enhancing on-board weaponry improves a transporter's freighting
          capacity but doesn't prepare it for combat. Therefore, it should only
          enter battle zones when accompanied by combat-ready ships, ensuring
          protection and support while fulfilling its logistical role.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 2</li>
              <li>Combustion Drive level 2</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function CelestiaDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Scientists developed celestias in geosynchronous orbit to transmit
          electrical energy to colonies. These celestias capture solar energy
          and relay it to ground stations using advanced lasers. While they
          offer a cost-effective energy solution, they are vulnerable in battle.
          Every unit produced adds 15 energy units.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyar level 1</li>
              <li>Combustion Drive level 1</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function ScraperDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Space combat led to thousands of ships lost in debris fields,
          unreachable by normal cargo ships. However, new shield technologies
          enabled the creation of Scrapers, a class of ships similar to
          Carriers. They safely salvaged the previously lost resources from the
          debris, making retrieval efficient and risk-free.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 4</li>
              <li>Combusiton drive level 6</li>
              <li>Shield Technology level 2</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function SparrowDescription() {
  return (
    <>
      <Container>
        <TextBox>
          All emperors will build the light fighter as their first fighting
          ship. Agile yet vulnerable when alone, these ships become a
          significant threat to any empire when amassed in large numbers. They
          are typically deployed to accompany carriers shipments to hostile
          planets with limited defenses.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 2</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function FrigateDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Frigates, with armor nearly five times thicker than that of the
          sparrow and more than double the firepower of existing combat ships,
          once dominated the universe due to their unmatched speeds. For almost
          a hundred years, they were unrivaled. However, their supremacy ended
          with the invention of the Astral Launcher and Plasma Projectors.
          Though still utilized against sparrows groups, frigates no longer hold
          the predominant position they once did.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 5</li>
              <li>Ion Systems level 2</li>
              <li>Thrust Drive level 4</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function ArmadeDescription() {
  return (
    <>
      <Container>
        <TextBox>
          When the frigates began losing ground to growing defense structures
          and suffered unacceptable levels of ship loss, a decision was made to
          create a vessel that could confront these defenses with minimal
          casualties. This led to the development of the Armade, a ship
          engineered to endure the most substantial battles. Equipped with large
          cargo spaces, heavy cannons, and a high warp drive speed, the Armade
          was designed to meet these challenges head-on. Once completed, it
          became the essential component of every raiding Emperor's fleet,
          symbolizing both strength and innovation.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 7</li>
              <li>Warp Drive level 4</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

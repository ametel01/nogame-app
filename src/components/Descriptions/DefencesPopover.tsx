import styled from "@emotion/styled";

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

export function BlasterDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Blasters are your initial defense, firing conventional warhead
          missiles at enemy targets from ground-based facilities. Being
          inexpensive to build and requiring no research, they're perfect for
          warding off raids, though less effective against larger-scale attacks.
          As you advance in constructing more potent defense systems, these
          Blasters act as simple buffers, letting your more powerful weapons
          cause greater damage for extended periods.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 1</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function BeamDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Your initial line of defense, more balanced than the Blaster. With an
          enhanced alloy composition, it employs denser, more potent beams, and
          an upgraded onboard targeting system for superior precision and
          strength.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyar level 2</li>
              <li>Energy Innovation level 2</li>
              <li>Beam Technology level 3</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function AstralDescription() {
  return (
    <>
      <Container>
        <TextBox>
          Once regarded as outdated amid thermonuclear and energy technology,
          projectile weapons have regained prominence thanks to advancements in
          the very energy technology that had aged them. The Astral Launcher, a
          grand particle accelerator, epitomizes this revival. Launching
          extremely heavy missiles with enormous electromagnetic force, it
          creates muzzle velocities that ignite the surrounding dirt and
          produces a sonic boom. Modern armor and shields often fail against
          this mighty force, and targets may be fully penetrated by a missile's
          power. Defence structures deactivate when too badly damaged.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 6</li>
              <li>Energy Innovation level 6</li>
              <li>Weapons Development level 3</li>
              <li>Shield Technology level 1</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

export function PlasmaDescription() {
  return (
    <>
      <Container>
        <TextBox>
          The Plasma Projector, one of the most advanced defense weapons, is
          your first basic line of defense. Using a nuclear reactor fuel cell,
          it superheats and compresses gases to create a plasma sphere. This
          sphere is then launched by an electromagnetic accelerator at
          incredible speed. Upon targeting and firing, the plasma sphere streaks
          towards its target, causing instant destruction upon impact. Its
          bluish appearance is as impressive as its lethal efficiency.
          <br />
          <br />
          Requirements:
          <ul>
            <b>
              <li>Dockyard level 8</li>
              <li>Plasma Engineering level 7</li>
            </b>
          </ul>
        </TextBox>
      </Container>
    </>
  );
}

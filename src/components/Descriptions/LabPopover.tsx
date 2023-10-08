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

export function ArmourDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    Armour Innovation is vital for expanding an empire,
                    increasing fleet and defense hull durability by 10%. Using
                    Steel, the universe's most abundant resource, reserves can
                    easily be gathered to enhance this technology further. Since
                    only metal is needed for research, excess can be
                    specifically used to boost further advancement in this area.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <li>
                            <b>Research Lab Level 2</b>
                        </li>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function CombustionDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    The Combustion Drive technology allows fabrication of
                    spacecraft like Carrier vessels, Sparrow, and Scraper,
                    boosting their Base Speed by 10% per advancement level.
                    Slower ships in a fleet benefit from increased fuel
                    efficiency due to this technology. At level 5 of the Impulse
                    Drive technology, Small Cargo ships' base speed doubles, and
                    they switch to Thrust Propulsion from Combustion Drive,
                    automatically enhancing speed and fuel efficiency
                    parameters.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 1</li>
                            <li>Energy Innovation Level 1</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function ComputerDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    Digital systems focus on enhancing computational abilities
                    through the development of more powerful and efficient
                    systems, increasing processing power and speed. These
                    improvements allow for more complex calculations and faster
                    task execution, raising the maximum number of controllable
                    fleets with each advancement. Specifically, the number of
                    fleet slots equals the level of digital systems plus one,
                    leading to increased raiding activities and resource
                    acquisition, thus maximizing resource capture.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 1</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function EnergyDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    Energy Innovation focuses on enhancing energy distribution
                    methods, a vital step for advancing technologies, defensive
                    infrastructures, and specific buildings. As various sectors
                    progressed, the existing energy distribution technology was
                    found lacking for specialized research projects,
                    necessitating improvements. Each upgrade in Energy
                    Innovation leads to new research opportunities, enabling the
                    development of advanced ships and defenses. Therefore,
                    Energy Innovation's progression is directly tied to the
                    sophistication of an entity's technology and defensive
                    capabilities.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 1</li>
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
                    Beam Technology, a critical component of scientific
                    investigation, facilitates the development of laser-based
                    weapon systems, which are commonly integrated into defensive
                    structures and various classes of vessels. This technology
                    is an essential prerequisite for the progression into ion
                    and plasma-based weaponry systems. The utility of Beam
                    Technology research exhibits a saturation point at Level 12,
                    beyond which no further enhancements to defensive
                    capabilities are observed. However, continuation of research
                    beyond this level can contribute to the accumulation of
                    research points, thereby improving the research ranking, but
                    with no corresponding increase in defensive benefits.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 1</li>
                            <li>Energy Innovation Level 1</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function IonDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    Ion Systems focus on studying ion concentration processes,
                    forming a concentrated ion beam with destructive potential.
                    This technology aids in developing weapon systems, enhancing
                    an empire by unlocking elements like defensive turrets, more
                    research opportunities, and extra ship classes. Successful
                    integration leads to advancements like deploying
                    Frigate-class vessels and initiating Plasma Engineering
                    research.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 4</li>
                            <li>Beam Technology Level 5</li>
                            <li>Energy Innovation Level 4</li>
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
                    An advanced evolution of ion technology has been achieved,
                    which facilitates the acceleration not of ions, but rather
                    of high-energy plasma. Upon collision with a target, this
                    plasma is capable of causing substantial structural damage.
                    Additionally, through this technological progression, our
                    research team has discerned a methodology to significantly
                    enhance the extraction process of steel and quartz
                    materials.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 4</li>
                            <li>Beam Technology Level 10</li>
                            <li>Energy Innovation Level 8</li>
                            <li>Ion Systems Level 8</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function ShieldDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    The field of shielding technology encompasses the
                    investigation of innovative methods for energy provision to
                    increase shield efficiency and robustness. Advancements in
                    this domain increment shield efficiency by a factor
                    equivalent to 10% of the intrinsic baseline value for each
                    subsequent level of development.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 6</li>
                            <li>Energy Innovation Level 3</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function SpacetimeDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    Hypothetically, hyperspatial navigation relies on the idea
                    of a simultaneous, coexisting reality plane. When the
                    hyperspatial propulsion system is activated, the
                    interstellar vehicle moves into this alternate dimension,
                    allowing for the quick traversal of vast distances compared
                    to conventional spacetime. Once the spacecraft reaches the
                    matching coordinate in the hyperspatial realm to its
                    intended location in normal space, it re-materializes. With
                    enough advancement in Spacetime Warp Technology,
                    Hyperspatial Propulsion becomes more than just a theoretical
                    concept.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 7</li>
                            <li>Energy Innovation Level 5</li>
                            <li>Shield Technology Level 5</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function ThrustDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    Thrust Propulsion technology, a sophisticated system
                    integral to spacecraft manufacturing, is crucial for the
                    successful assembly of specific classes of vessels, namely
                    Sparrows and Frigates. This innovative technology is
                    designed to considerably enhance the performance of the
                    spacecraft it is incorporated into. In quantitative terms,
                    the application of Thrust Propulsion technology generates an
                    increment in the Base Speed of all spacecraft that are
                    equipped with it. More specifically, for each level of
                    advancement in the Thrust Propulsion technology, the Base
                    Speed is boosted by a substantial percentage - 20%
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 2</li>
                            <li>Energy Innovation Level 1</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function WarpDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    The Warp Drive is an innovative technology crucial to the
                    construction of Armades structures, providing capabilities
                    not possible through conventional means. It also has a
                    substantial impact on vessel propulsion systems. Ships
                    equipped with this technology experience a 30% increase in
                    Base Speed for each level of proficiency in the Warp Drive,
                    leading to a significant and cumulative boost in efficiency
                    and speed of movement.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 7</li>
                            <li>Energy Innovation Level 5</li>
                            <li>Shield Tech 5</li>
                            <li>Spacetime Warp Level 3</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

export function WeaponsDescription() {
    return (
        <>
            <Container>
                <TextBox>
                    In combat readiness, advancements in weapons development are
                    vital, enhancing the strength of naval vessels and defenses
                    by 10% per level of progression over the initial system
                    strength. This increase in armament capabilities is directly
                    measurable, reflecting in the offensive and defensive
                    performance metrics.
                    <br />
                    <br />
                    Requirements:
                    <ul>
                        <b>
                            <li>Research Lab Level 4</li>
                        </b>
                    </ul>
                </TextBox>
            </Container>
        </>
    );
}

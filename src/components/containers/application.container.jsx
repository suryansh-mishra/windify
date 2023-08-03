import styled from '@emotion/styled';

const ApplicationContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  flex-flow: row;
  gap: 1.75rem;
  padding-block: 2.5rem;
  background-color: #ffffff2f;
  backdrop-filter: blur(1px);

  @media only screen and (min-width: 700px) {
    max-height: 100vh;
  }
  @media only screen and (max-width: 700px) {
    flex-flow: column;
    min-height: 110vh;
    padding-block: 0;
    gap: 0;
    background-image: var(--color--container--prime);
  }
`;

export default ApplicationContainer;

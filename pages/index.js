import tw, { styled } from "twin.macro";
import Page from "./../components/Page";
import Sidebar from "./../components/Sidebar";
import Main from "./../components/Main";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

const Home = (_) => {
  return (
    <Page title="Home">
      <Container>
        <Section>
          <Sidebar />
          <Main />
        </Section>
        <Player />
      </Container>
    </Page>
  );
};

const Container = styled.div`
  ${tw`flex flex-col h-screen`}
`;

const Section = styled.section`
  ${tw`flex h-full`}
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;

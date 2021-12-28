import tw, { styled } from "twin.macro";
import { getProviders, signIn } from "next-auth/react";
import Page from "./../components/Page";
import Brand from "../components/Brand";
import Button from "./../components/Button";

const Login = (_) => {
  return (
    <Page title="Login">
      <Container>
        <Brand />
        {Object.values(_.providers).map((provider, key) => (
          <Button
            key={key}
            color="primary"
            onClick={() =>
              signIn(provider.id, { callbackUrl: './../' })
            }
          >
            Login with {provider.name}
          </Button>
        ))}
      </Container>
    </Page>
  );
};

const Container = styled.div`
  ${tw`flex flex-col items-center justify-center gap-2 min-h-screen bg-black`}
`;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default Login;

import Head from 'next/head';
import tw, { styled } from 'twin.macro';

const Page = (_) => {
  return (
    <>
      <Head>
        <title>{_.title || 'App'}</title>
        <meta name="description" content={_.description || "App Description"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {_.children}
      </Container>
    </>
  )
};

const Container = styled.div`
  ${tw`h-screen bg-black text-white`}
`;

export default Page;
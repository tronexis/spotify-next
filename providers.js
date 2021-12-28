import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function Providers(_) {
  return (
    <SessionProvider session={_.session}>
      <RecoilRoot>{_.children}</RecoilRoot>
    </SessionProvider>
  );
}

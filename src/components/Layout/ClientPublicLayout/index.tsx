import { Navbar } from '@components/Navbar/NavBar';

type Props = {
  children?: React.ReactNode;
};

const ClientPublicLayout = ({ children }: Props) => {
  return (
    <main>
      <article>
        <Navbar />
        <aside>{children}</aside>
      </article>
    </main>
  );
};
export default ClientPublicLayout;

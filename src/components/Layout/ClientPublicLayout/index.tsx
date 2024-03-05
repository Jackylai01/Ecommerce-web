import { Navbar } from '@components/Navbar/NavBar';

type Props = {
  children?: React.ReactNode;
};

const ClientPublicLayout = ({ children }: Props) => {
  return (
    <main className='auth-layout'>
      <article className='auth-layout__container'>
        <Navbar />
        <aside className='auth-layout__aside'>{children}</aside>
      </article>
    </main>
  );
};
export default ClientPublicLayout;

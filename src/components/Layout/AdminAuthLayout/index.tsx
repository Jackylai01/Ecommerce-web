type Props = {
  children?: React.ReactNode;
};

const AdminAuthLayout = ({ children }: Props) => {
  return (
    <main className='auth-layout'>
      <article className='auth-layout__container'>
        <aside className='auth-layout__aside'>{children}</aside>
      </article>
    </main>
  );
};
export default AdminAuthLayout;

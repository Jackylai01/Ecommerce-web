import { Banner } from '@components/Home/Banner';
import { TopCategories } from '@components/Home/TopCategories';
import { Navbar } from '@components/Navbar/NavBar';
import { fakeCategories } from '@helpers/products';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <TopCategories categories={fakeCategories} />
    </>
  );
};

export default HomePage;

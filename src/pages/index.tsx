import { Box } from '@chakra-ui/react';
import { Footer } from '@components/Footer';
import { HeroBanner } from '@components/Home/HeroBanner';
import { FeaturedCategories } from '@components/Home/FeaturedCategories';
import { TrendingProducts } from '@components/Home/TrendingProducts';
import { PromotionBanner } from '@components/Home/PromotionBanner';
import { NewArrivals } from '@components/Home/NewArrivals';
import type { NextPage } from 'next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: NextPage = () => {
  return (
    <Box bg='gray.50'>
      {/* Hero Banner - 主視覺橫幅 */}
      <HeroBanner />

      {/* Featured Categories - 特色分類 */}
      <FeaturedCategories />

      {/* Trending Products - 熱門商品 */}
      <TrendingProducts />

      {/* Promotion Banner - 促銷橫幅 */}
      <PromotionBanner />

      {/* New Arrivals - 新品上市 */}
      <NewArrivals />

      {/* Footer - 頁尾 */}
      <Footer />
    </Box>
  );
};

export default HomePage;

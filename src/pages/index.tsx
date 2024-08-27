import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { Footer } from '@components/Footer';
import { Banner } from '@components/Home/Banner';
import { FeaturedProducts } from '@components/Home/FeaturedProducts';
import { TopCategories } from '@components/Home/TopCategories';
import { fakeProducts } from '@helpers/products';
import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  // 當進入頁面時自動打開彈跳視窗
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box>
      {/* 通知彈跳視窗 */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              通知
            </AlertDialogHeader>

            <AlertDialogBody>
              嗨這裡是測試用的網站，後台連結如下:
              <Button>
                <Link href='/zigong'>前往後台</Link>
              </Button>
              <Box>測式帳號:sn185672@gmail.com</Box>
              <Box>測式密碼:12345678</Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                關閉
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* 首頁內容 */}
      <Banner />
      <TopCategories />
      <FeaturedProducts title='Best Deals For You' products={fakeProducts} />
      <FeaturedProducts title='Best Deals For You' products={fakeProducts} />
      <Footer />
    </Box>
  );
};

export default HomePage;

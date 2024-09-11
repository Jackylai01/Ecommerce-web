import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Image,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import Carousel from '@components/Carouse';
import { Footer } from '@components/Footer';
import { Banner } from '@components/Home/Banner';
import { TopCategories } from '@components/Home/TopCategories';
import { images, size } from '@fixtures/Carousel';
import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box>
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
              <h1> 嗨這裡是測試用的網站，後台連結如下:</h1>
              <Button>
                <Link href='/zigong'>前往管理員後台</Link>
              </Button>
              <Button>
                <Link href='/public/auth/login'>前往個人會員後台</Link>
              </Button>
              <Box>如果網頁有Loading 的狀況請稍等30秒左右</Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                關閉
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Banner />
      <Carousel images={images} size={size} />
      <TopCategories />
      <Box>
        <Link href='/'>
          <Image
            src='https://res.cloudinary.com/dlm0ieiyt/image/upload/v1724263331/ecommerce-carrefour/con_odwyxu.png'
            maxH='680px'
            w='100%'
            objectFit='cover'
          />
        </Link>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;

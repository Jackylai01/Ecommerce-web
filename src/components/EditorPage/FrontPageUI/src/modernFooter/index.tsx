import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <Box as='footer' className='modern-footer'>
      <Box className='modern-footer__container'>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={8}
        >
          <Box>
            <Heading as='h3' className='modern-footer__heading'>
              關於我們
            </Heading>
            <Text className='modern-footer__text'>
              我們是一家致力於提供高品質產品的電商平台。
            </Text>
          </Box>
          <Box>
            <Heading as='h3' className='modern-footer__heading'>
              客戶服務
            </Heading>
            <ul className='modern-footer__list'>
              <li>
                <a href='#' className='modern-footer__link'>
                  聯繫我們
                </a>
              </li>
              <li>
                <a href='#' className='modern-footer__link'>
                  退換貨政策
                </a>
              </li>
              <li>
                <a href='#' className='modern-footer__link'>
                  常見問題
                </a>
              </li>
            </ul>
          </Box>
          <Box>
            <Heading as='h3' className='modern-footer__heading'>
              快速連結
            </Heading>
            <ul className='modern-footer__list'>
              <li>
                <a href='#' className='modern-footer__link'>
                  首頁
                </a>
              </li>
              <li>
                <a href='#' className='modern-footer__link'>
                  產品
                </a>
              </li>
              <li>
                <a href='#' className='modern-footer__link'>
                  優惠活動
                </a>
              </li>
            </ul>
          </Box>
          <Box>
            <Heading as='h3' className='modern-footer__heading'>
              訂閱電子報
            </Heading>
            <form className='modern-footer__form'>
              <Input
                type='email'
                placeholder='輸入您的電子郵件'
                className='modern-footer__input'
              />
              <Button className='modern-footer__button'>訂閱</Button>
            </form>
          </Box>
        </Grid>
        <Flex className='modern-footer__bottom'>
          <Text>&copy; 2024 您的電商網站. 版權所有.</Text>
          <Flex>
            <IconButton
              aria-label='Facebook'
              icon={<FaFacebookF />}
              className='modern-footer__icon'
            />
            <IconButton
              aria-label='Instagram'
              icon={<FaInstagram />}
              className='modern-footer__icon'
            />
            <IconButton
              aria-label='Twitter'
              icon={<FaTwitter />}
              className='modern-footer__icon'
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;

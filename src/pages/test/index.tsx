import { Box, Flex, Image } from '@chakra-ui/react';
import { testImage } from '@fixtures/componentLibrary';
import { NextPage } from 'next';

const TextPage: NextPage = () => {
  return (
    <Box as='main' className='banner-main'>
      <Box as='h1' className='banner-main__title'>
        PECENT PROJECTS
      </Box>
      <Flex as='article' className='banner-main__article'>
        <Box>
          <Image src={testImage} className='banner-main__image-box' />
          <Box as='h2' className='banner-main__heading'>
            PECENT PROJECTS
          </Box>
          <Box as='span' className='banner-main__description'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
            consequatur ad praesentium eius architecto nostrum, quisquam omnis
          </Box>
        </Box>
        <Box as='section' className='banner-main__section'>
          <Box>
            <Image src={testImage} className='banner-main__small-image-box' />
            <Box as='h2' className='banner-main__heading'>
              PECENT PROJECTS
            </Box>
            <Box as='span' className='banner-main__description'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
              consequatur ad praesentium eius architecto nostrum, quisquam omnis
            </Box>
          </Box>
          <Box className='banner-main__section-box'>
            <Image src={testImage} className='banner-main__small-image-box' />
            <Box as='h2' className='banner-main__heading'>
              PECENT PROJECTS
            </Box>
            <Box as='span' className='banner-main__description'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
              consequatur ad praesentium eius architecto nostrum, quisquam omnis
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default TextPage;

import { Box, Flex, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const DualScrollingImageList: React.FC = () => {
  const [topDirection, setTopDirection] = useState(1);
  const [bottomDirection, setBottomDirection] = useState(-1);

  const topRowRef = useRef<HTMLDivElement | null>(null);
  const bottomRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;
    let topScrollPosition = 0;
    let bottomScrollPosition = 0;

    const animate = () => {
      if (topRow && bottomRow) {
        // 計算最大滾動距離
        const maxScroll = topRow.scrollWidth - topRow.clientWidth;

        // 上排滾動邏輯
        topScrollPosition += topDirection;
        if (topScrollPosition >= maxScroll || topScrollPosition <= 0) {
          setTopDirection((prev) => -prev);
        }

        // 下排滾動邏輯
        bottomScrollPosition += bottomDirection;
        if (bottomScrollPosition >= maxScroll || bottomScrollPosition <= 0) {
          setBottomDirection((prev) => -prev);
        }

        // 應用滾動位置
        topRow.style.transform = `translateX(${-topScrollPosition}px)`;
        bottomRow.style.transform = `translateX(${-bottomScrollPosition}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [topDirection, bottomDirection]);

  const images = [
    '/api/placeholder/200/150',
    '/api/placeholder/200/150',
    '/api/placeholder/200/150',
    '/api/placeholder/200/150',
    '/api/placeholder/200/150',
    '/api/placeholder/200/150',
  ];

  return (
    <Box overflow='hidden'>
      <Flex
        ref={topRowRef}
        className='flex whitespace-nowrap py-2 transition-transform duration-100'
      >
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            boxSize='200px'
            height='150px'
            mr='4'
          />
        ))}
      </Flex>
      <Flex
        ref={bottomRowRef}
        className='flex whitespace-nowrap py-2 transition-transform duration-100'
      >
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            boxSize='200px'
            height='150px'
            mr='4'
          />
        ))}
      </Flex>
    </Box>
  );
};

export default DualScrollingImageList;

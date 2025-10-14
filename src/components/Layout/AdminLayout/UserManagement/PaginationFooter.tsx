import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Button,
  Select,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Metadata } from '@models/entities/shared/pagination';
import { useRouter } from 'next/router';
import { useAdminColorMode } from 'src/context/colorMode';

interface PaginationFooterProps {
  metadata: Metadata;
}

const PaginationFooter = ({ metadata }: PaginationFooterProps) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { colorMode } = useAdminColorMode();

  const currentPage = Number(query.page) || 1;
  const limit = Number(query.limit) || metadata.limit;

  const pageNumbers = Array.from(
    { length: metadata.last },
    (_, i) => i + 1,
  ).slice(
    Math.max(0, currentPage - 2),
    Math.min(metadata.last, currentPage + 1),
  );

  const setPage = (page: number) => {
    router.push({
      pathname,
      query: { ...query, page: page.toString() },
    });
  };

  const setLimit = (newLimit: string) => {
    router.push({
      pathname,
      query: { ...query, page: '1', limit: newLimit },
    });
  };

  const borderColor = colorMode === 'light' ? 'gray.200' : 'gray.600';
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.750';
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.300';

  return (
    <Box
      w='100%'
      p={6}
      border='1px'
      borderColor={borderColor}
      bg={bgColor}
      borderRadius='lg'
      mt={4}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align='center'
        gap={4}
        w='100%'
      >
        {/* 左側：資料統計資訊 */}
        <Text fontSize='sm' color={textColor} flexShrink={0}>
          顯示第 {Math.min((currentPage - 1) * limit + 1, metadata.count)} - {Math.min(currentPage * limit, metadata.count)} 筆，共 {metadata.count} 筆資料
        </Text>

        {/* 右側：分頁控制區 */}
        <Flex align='center' gap={3} flexWrap='wrap' justify={{ base: 'center', md: 'flex-end' }}>
          {/* 每頁顯示數量 */}
          <HStack spacing={2}>
            <Text fontSize='sm' color={textColor}>
              每頁
            </Text>
            <Select
              value={limit.toString()}
              onChange={(e) => setLimit(e.target.value)}
              size='sm'
              width='70px'
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Select>
          </HStack>

          {/* 分頁按鈕組 */}
          <HStack spacing={1}>
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label='上一頁'
              size='sm'
              variant='outline'
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              isDisabled={currentPage <= 1}
            />

            {pageNumbers.map((number) => (
              <Button
                key={number}
                size='sm'
                onClick={() => setPage(number)}
                colorScheme={currentPage === number ? 'blue' : 'gray'}
                variant={currentPage === number ? 'solid' : 'ghost'}
              >
                {number}
              </Button>
            ))}

            <IconButton
              icon={<ChevronRightIcon />}
              aria-label='下一頁'
              size='sm'
              variant='outline'
              onClick={() => setPage(Math.min(metadata.last, currentPage + 1))}
              isDisabled={currentPage >= metadata.last}
            />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PaginationFooter;

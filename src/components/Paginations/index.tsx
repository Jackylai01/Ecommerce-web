// components/Pagination.tsx
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Select,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Metadata } from '@models/entities/shared/pagination';
import { useRouter } from 'next/router';

interface PaginationProps {
  metadata: Metadata;
}

const Pagination: React.FC<PaginationProps> = ({ metadata }) => {
  const router = useRouter();
  const { pathname, query } = router;

  // 獲取當前的頁碼
  const currentPage = Number(query.page) || 1;
  const limit = Number(query.limit) || metadata.limit;

  // 生成頁碼
  const pageNumbers = [];
  for (let i = 1; i <= metadata.last; i++) {
    pageNumbers.push(i);
  }

  // 跳转到指定页码
  const setPage = (page: number) => {
    router.push({
      pathname,
      query: { ...query, page },
    });
  };

  // 改變每頁顯示數量
  const setLimit = (newLimit: string) => {
    router.push({
      pathname,
      query: { ...query, page: 1, limit: newLimit },
    });
  };

  const displayValue = useBreakpointValue({ base: 'none', md: 'block' });

  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' });
  const selectSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const hStackSpacing = useBreakpointValue({ base: '1', md: '2' });
  const textNoOfLines = useBreakpointValue({ base: 1, md: undefined });
  const fontSize = useBreakpointValue({ base: 'xs', md: 'sm' });

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems='center'
      justifyContent='center'
      gap='10px'
      wrap='wrap'
    >
      <HStack spacing={hStackSpacing}>
        <IconButton
          aria-label='First page'
          icon={<ArrowBackIcon />}
          onClick={() => setPage(1)}
          isDisabled={currentPage === 1}
          size={buttonSize}
        />
        <IconButton
          aria-label='Previous page'
          icon={<ChevronLeftIcon />}
          onClick={() => setPage(currentPage - 1)}
          isDisabled={currentPage === 1}
          size={buttonSize}
        />
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => setPage(number)}
            isActive={currentPage === number}
            display={currentPage === number ? 'block' : displayValue}
            size={buttonSize}
          >
            {number}
          </Button>
        ))}
        <IconButton
          aria-label='Next page'
          icon={<ChevronRightIcon />}
          onClick={() => setPage(currentPage + 1)}
          isDisabled={currentPage === metadata.last}
          size={buttonSize}
        />
        <IconButton
          aria-label='Last page'
          icon={<ArrowForwardIcon />}
          onClick={() => setPage(metadata.last)}
          isDisabled={currentPage === metadata.last}
          size={buttonSize}
        />
      </HStack>
      <Select
        onChange={(e) => setLimit(e.target.value)}
        value={limit.toString()}
        size={selectSize}
      >
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
      </Select>
      <Text fontSize={fontSize} noOfLines={textNoOfLines}>
        顯示 {currentPage * limit - limit + 1} 至
        {Math.min(currentPage * limit, metadata.count)} 筆，共 {metadata.count}{' '}
        筆
      </Text>
    </Flex>
  );
};

export default Pagination;

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Select,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Metadata } from '@models/entities/shared/pagination';
import { useRouter } from 'next/router';
import { useAdminColorMode } from 'src/context/colorMode';

const Pagination = ({ metadata }: { metadata: Metadata }) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { colorMode } = useAdminColorMode();
  const PaginationColor = colorMode === 'light' ? 'black' : 'white';
  const BgColor = colorMode === 'light' ? 'white' : 'gray';

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

  const iconSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const selectSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' });

  return (
    <Flex
      mt='4'
      align='center'
      justify='center'
      direction={{ base: 'column', md: 'row' }}
      gap={4}
      color={PaginationColor}
    >
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label='Previous page'
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        isDisabled={currentPage <= 1}
        size={iconSize}
        color={PaginationColor}
      />
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        align='center'
        spacing={2}
      >
        {pageNumbers.map((number) => (
          <Button
            key={number}
            size={buttonSize}
            onClick={() => setPage(number)}
            isActive={currentPage === number}
            color={PaginationColor}
          >
            {number}
          </Button>
        ))}
      </Stack>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label='Next page'
        onClick={() => setPage(Math.min(metadata.last, currentPage + 1))}
        isDisabled={currentPage >= metadata.last}
        size={iconSize}
        color={PaginationColor}
      />
      <Select
        onChange={(e) => setLimit(e.target.value)}
        value={limit.toString()}
        size={selectSize}
        width={{ base: '100px', md: '150px' }}
        sx={{ maxWidth: '150px' }}
        color={PaginationColor}
      >
        <option value='10' style={{ backgroundColor: BgColor }}>
          10
        </option>
        <option value='25' style={{ backgroundColor: BgColor }}>
          25
        </option>
        <option value='50' style={{ backgroundColor: BgColor }}>
          50
        </option>
      </Select>
      <Text>
        顯示 {Math.min((currentPage - 1) * limit + 1, metadata.count)} 至
        {Math.min(currentPage * limit, metadata.count)} 筆，共 {metadata.count}
        筆
      </Text>
    </Flex>
  );
};

export default Pagination;

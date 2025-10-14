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
      align='center'
      justify='center'
      gap={2}
      color={PaginationColor}
    >
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label='Previous page'
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        isDisabled={currentPage <= 1}
        size={iconSize}
        color={PaginationColor}
        variant='outline'
      />
      <Stack
        direction='row'
        align='center'
        spacing={1}
      >
        {pageNumbers.map((number) => (
          <Button
            key={number}
            size={buttonSize}
            onClick={() => setPage(number)}
            colorScheme={currentPage === number ? 'blue' : 'gray'}
            variant={currentPage === number ? 'solid' : 'ghost'}
            color={currentPage === number ? 'white' : PaginationColor}
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
        variant='outline'
      />
      <Select
        onChange={(e) => setLimit(e.target.value)}
        value={limit.toString()}
        size={selectSize}
        width='80px'
        ml={2}
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
    </Flex>
  );
};

export default Pagination;

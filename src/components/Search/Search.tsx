import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useOutsideClick,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import { publicProductsListAsync } from '@reducers/public/products/actions';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export const Search = ({ isMobileSearch }: { isMobileSearch?: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ref = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const isMobile = useBreakpointValue({ base: true, md: false });

  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsModalOpen(false);
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value.trim()) {
      dispatch(
        publicProductsListAsync({ page: 1, limit: 10, search: e.target.value }),
      ).then(() => {
        router.push(`/products?search=${encodeURIComponent(e.target.value)}`);
      });
      setIsModalOpen(false);
    }
  };

  if (isMobile && !isMobileSearch) {
    return null;
  }

  return (
    <Box pos='relative' ref={ref} bg='white'>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.400' />
        </InputLeftElement>
        <Input
          type='text'
          placeholder='Search...'
          focusBorderColor='brand.primaryLight'
          borderWidth='1px'
          borderColor='gray.400'
          value={searchText}
          onClick={() => setIsModalOpen(true)}
          onChange={handleSearchChange}
          color='black'
        />
      </InputGroup>
    </Box>
  );
};

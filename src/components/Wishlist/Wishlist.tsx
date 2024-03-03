import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetItems } from '@reducers/client/cart';
import { BsHeart } from 'react-icons/bs';
import { WishlistItem } from './WishlistItem';

export const Wishlist = () => {
  const { wishlist } = useAppSelector((state) => state.clientCart);
  const dispatch = useAppDispatch();

  const handleResetWishlist = () => {
    dispatch(resetItems('wishlist'));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          color='brand.primary'
          variant='ghost'
          _hover={{
            bgColor: 'transparent',
          }}
          pos='relative'
        >
          <BsHeart size='0.9rem' /> <Text mx='1'>Wishlist</Text>
          {wishlist.length !== 0 && (
            <Flex
              pos='absolute'
              top='0px'
              right='5px'
              bgColor='brand.primaryLight'
              boxSize='15px'
              rounded='full'
              color='white'
              fontSize='0.6rem'
              align='center'
              justify='center'
            >
              {wishlist.length}
            </Flex>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color='brand.primary' fontWeight='bold'>
          Wishlist
        </PopoverHeader>
        <PopoverBody p='1rem'>
          {wishlist.length === 0 ? (
            <>Your Wishlist is Empty</>
          ) : (
            wishlist.map((item) => <WishlistItem key={item.id} item={item} />)
          )}
        </PopoverBody>
        <PopoverFooter>
          {wishlist.length !== 0 && (
            <Button variant='outline' mr={3} onClick={handleResetWishlist}>
              Clear Wishlist
            </Button>
          )}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

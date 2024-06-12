import {
  Button,
  Flex,
  Popover,
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
import { useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { WishlistItem } from './WishlistItem';

export const Wishlist = () => {
  const { wishlist } = useAppSelector((state) => state.clientCart);
  const [localFavorites, setLocalFavorites] = useState<any>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );
    setLocalFavorites(savedFavorites);
  }, []);

  const handleResetWishlist = () => {
    dispatch(resetItems('wishlist'));
    localStorage.removeItem('favorites');
    setLocalFavorites([]);
  };

  const totalFavorites = wishlist.length + localFavorites.length;

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          color='black'
          variant='ghost'
          _hover={{
            bgColor: 'transparent',
          }}
          pos='relative'
        >
          <BsHeart size='0.9rem' /> <Text mx='1'>Wishlist</Text>
          {totalFavorites !== 0 && (
            <Flex
              pos='absolute'
              top='0px'
              right='5px'
              bg='red'
              boxSize='15px'
              rounded='full'
              color='white'
              fontSize='0.6rem'
              align='center'
              justify='center'
            >
              {totalFavorites}
            </Flex>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg='gray.700'>
        <PopoverCloseButton />
        <PopoverHeader color='b' fontWeight='bold'>
          Wishlist
        </PopoverHeader>
        <PopoverBody p='1rem'>
          {totalFavorites === 0 ? (
            <>Your Wishlist is Empty</>
          ) : (
            <>
              {wishlist.map((item) => (
                <WishlistItem key={item._id} item={item} />
              ))}
              {localFavorites.map((item: any) => (
                <WishlistItem key={item._id} item={item} />
              ))}
            </>
          )}
        </PopoverBody>
        <PopoverFooter>
          {totalFavorites !== 0 && (
            <Button variant='outline' mr={3} onClick={handleResetWishlist}>
              Clear Wishlist
            </Button>
          )}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

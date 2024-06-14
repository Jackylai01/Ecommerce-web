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
  useToast,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { resetItems } from '@reducers/client/cart';
import {
  clearFavoritesAsync,
  publicGetFavoritesAsync,
} from '@reducers/public/favorite/actions';
import { useEffect } from 'react';
import { BsHeart } from 'react-icons/bs';
import { WishlistItem } from './WishlistItem';

export const Wishlist = () => {
  const { favorites } = useAppSelector((state) => state.publicFavorites);
  const { userInfo } = useAppSelector((state) => state.clientAuth);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      dispatch(publicGetFavoritesAsync(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const handleResetWishlist = () => {
    if (userInfo) {
      dispatch(clearFavoritesAsync(userInfo._id)).then(() => {
        toast({
          title: 'All items removed from your wishlist.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
    } else {
      dispatch(resetItems('wishlist'));
      localStorage.removeItem('favorites');
      toast({
        title: 'All items removed from your local wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const totalFavorites = favorites.filter((fav) => fav).length;

  console.log('Total Favorites:', totalFavorites);
  console.log('Favorites Array:', favorites);

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
      <PopoverContent border='none'>
        <PopoverCloseButton />
        <PopoverHeader fontWeight='bold'>Wishlist</PopoverHeader>
        <PopoverBody p='1rem'>
          {totalFavorites === 0 ? (
            <>Your Wishlist is Empty</>
          ) : (
            <>
              {favorites.map((item, key) => (
                <WishlistItem key={key} item={item} />
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

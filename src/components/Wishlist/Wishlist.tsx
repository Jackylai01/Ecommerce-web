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
import { BsHeart } from 'react-icons/bs';
import { WishlistItem } from './WishlistItem';

export const Wishlist = () => {
  const { favorites } = useAppSelector((state) => state.publicFavorites);
  const dispatch = useAppDispatch();

  const handleResetWishlist = () => {
    dispatch(resetItems('wishlist'));
  };

  const totalFavorites = favorites.length;

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
              {favorites.map((item) => (
                <WishlistItem key={item} item={item} />
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

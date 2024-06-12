import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import useAppSelector from '@hooks/useAppSelector';
import { addItem, resetItems } from '@reducers/client/cart';

import { calculateItemsTotal } from '@helpers/products';
import Link from 'next/link';
import { useRef } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { CartItem } from './CartItem';

export const Cart = () => {
  const { cart } = useAppSelector((state) => state.clientCart);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  const handleCheckout = () => {
    cart.forEach((cartItem) => {
      dispatch(
        addItem({ key: 'checkout', product: cartItem, count: cartItem.count }),
      );
    });
    // 重置购物车
    dispatch(resetItems('cart'));
    onClose();
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant='ghost'
        color='black'
        _hover={{
          bgColor: 'transparent',
        }}
        pos='relative'
      >
        <BsCart4 /> <Text mx='1'>Cart</Text>
        {cart.length !== 0 && (
          <Flex
            pos='absolute'
            top='0px'
            right='5px'
            bgColor='brand.primaryLight'
            boxSize='15px'
            rounded='full'
            color='white'
            bg='red'
            fontSize='0.6rem'
            align='center'
            justify='center'
          >
            {cart.length}
          </Flex>
        )}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='lg'
      >
        <DrawerOverlay />
        <DrawerContent bg='white'>
          <DrawerCloseButton />
          <DrawerHeader color='black'>Cart ({cart.length} Items)</DrawerHeader>
          <DrawerBody>
            {cart.length === 0 ? (
              <>Your Cart is Empty</>
            ) : (
              cart.map((item) => <CartItem key={item._id} item={item} />)
            )}
          </DrawerBody>
          {cart.length !== 0 && (
            <DrawerFooter justifyContent='space-between' color='black'>
              <Box>
                <Button
                  variant='outline'
                  mr={3}
                  onClick={() => dispatch(resetItems('cart'))}
                  color='black'
                >
                  Clear Cart
                </Button>
                <Link href='/checkout' passHref>
                  <Button
                    as='a'
                    bgColor='brand.primary'
                    color='black'
                    _hover={{ bgColor: 'gray.300' }}
                    _active={{ bgColor: 'black' }}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Link>
              </Box>
              <Box fontWeight='bold'>Total: $ {calculateItemsTotal(cart)}</Box>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

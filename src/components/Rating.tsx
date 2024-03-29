import { Flex, Text } from '@chakra-ui/react';
import { IRating } from '@models/requests/products';
import ReactStars from 'react-stars';

interface RatingProps {
  rating: IRating;
}
export const Rating = ({ rating }: RatingProps) => {
  return (
    <Flex align='center'>
      <ReactStars
        count={5}
        value={rating?.rate}
        half={true}
        size={18}
        color1='#ccc'
        color2='#000'
        edit={false}
      />
      <Text fontSize='xs' mx='1' color='black'>
        ({rating?.count})
      </Text>
    </Flex>
  );
};

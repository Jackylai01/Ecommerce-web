import {
  Box,
  Button,
  Collapse,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { Faq } from '@models/responses/faq.res';
import { getFaqsListAsync } from '@reducers/public/faq/actions';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface FAQItemProps {
  item: Faq;
}

const FAQItem: React.FC<FAQItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      borderWidth='1px'
      borderColor={borderColor}
      borderRadius='md'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ boxShadow: 'md' }}
    >
      <Button
        w='full'
        textAlign='left'
        onClick={() => setIsOpen(!isOpen)}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        py={4}
        px={5}
        bg={bgColor}
        _hover={{ bg: hoverBg }}
        transition='all 0.3s'
      >
        <Text fontWeight='semibold'>{item.question}</Text>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p={5} bg={bgColor}>
          <Text>{item.answer}</Text>
        </Box>
      </Collapse>
    </Box>
  );
};

const FAQ: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: faqs } = useAppSelector((state) => state.publicFaq);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    dispatch(getFaqsListAsync());
  }, [dispatch]);

  return (
    <Box maxW='4xl' mx='auto' p={8} bg={bgColor} minH='100vh'>
      <Heading as='h2' size='2xl' mb={8} textAlign='center' color={textColor}>
        常見問題與解答
      </Heading>
      <Stack spacing={4}>
        {faqs?.map((item) => (
          <FAQItem key={item._id} item={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default FAQ;

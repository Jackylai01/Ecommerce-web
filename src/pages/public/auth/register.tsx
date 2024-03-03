import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface BubbleStyle {
  left: string;
  animationDuration: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const [gender, setGender] = useState('male');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bubbles, setBubbles] = useState<BubbleStyle[]>([]);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    const generatedBubbles = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <>
      <Flex
        as='main'
        alignItems='center'
        justifyContent='center'
        bgImage="url('/images/login/login-background.png')"
        bgSize='cover'
        bgPosition='center'
        bgRepeat='no-repeat'
        height='100%'
      >
        <Box
          width={{ base: '80%', md: '70%' }}
          boxShadow='0 8px 8px rgba(0, 0, 0, 0.7)'
          borderRadius='md'
          overflow='hidden'
          mt={{ base: '0rem', md: '2rem' }}
          m='1rem'
        >
          <Flex as='article' direction={{ base: 'column', sm: 'row' }}>
            <Box
              as='section'
              display='flex'
              alignItems='center'
              justifyContent='center'
              flex={1}
              bgGradient='linear(to-r, blue.500, blue.900)'
            >
              {bubbles.map((style, i) => (
                <Box key={i} className='bubble' style={style} />
              ))}
              <Image
                w={{ base: '50%', md: '100%', sm: '100%' }}
                src='/images/login/paper-map.png'
                alt='SVG Image'
              />
            </Box>
            <Box flex={1} p={5} bg='white'>
              <FormControl id='username' mb={4}>
                <FormLabel>用戶名稱</FormLabel>
                <Input type='text' />
              </FormControl>
              <FormControl id='username' mb={4}>
                <FormLabel>信箱</FormLabel>
                <Input type='email' />
              </FormControl>
              <FormControl id='password' mb={4}>
                <FormLabel>密碼</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      bg='none'
                      onClick={handlePasswordVisibility}
                      _hover={{ bg: 'transparent' }}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id='password' mb={4}>
                <FormLabel>確認密碼</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      bg='none'
                      onClick={handleConfirmPasswordVisibility}
                      _hover={{ bg: 'transparent' }}
                    >
                      {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl as='fieldset'>
                <FormLabel as='legend'>性別</FormLabel>
                <RadioGroup onChange={setGender} value={gender}>
                  <Stack direction='row'>
                    <Radio value='male'>男性</Radio>
                    <Radio value='female'>女性</Radio>
                    <Radio value='other'>其他</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl id='company-name' mt='1rem'>
                <FormLabel>單位名稱</FormLabel>
                <Input type='text' placeholder='公司、學校、單位、個人' />
              </FormControl>
              <FormControl id='position'>
                <FormLabel>稱謂</FormLabel>
                <Input
                  type='text'
                  placeholder='學生、都市計畫工作人員、學者、經理'
                />
              </FormControl>

              <Button colorScheme='blue' width='full' mt='1rem' mb={4}>
                註冊
              </Button>
              <Flex as='span' justifyContent='space-between'>
                <Link
                  color='blue.500'
                  onClick={() => router.push(`/public/auth/login`)}
                >
                  快速登入
                </Link>
                <Link color='blue.500' onClick={() => router.push('/')}>
                  回首頁
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Register;

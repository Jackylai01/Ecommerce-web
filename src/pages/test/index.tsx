import { Box, Flex } from '@chakra-ui/react';
import Chat from '@components/chat';
import ChatList from '@components/ClientChat';

const ChatApp = () => {
  return (
    <Flex w='100%' h='100vh' bg='gray.900'>
      <Box w='30%' h='100%' bg='gray.800'>
        <ChatList />
      </Box>
      <Box w='70%' h='100%'>
        <Chat />
      </Box>
    </Flex>
  );
};

export default ChatApp;

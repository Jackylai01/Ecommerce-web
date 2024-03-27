import {
  Box,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

interface FieldSpec {
  fieldName: string;
  type: 'text' | 'image';
  displayName: string;
}

interface TablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  title: string;
  renderFields?: FieldSpec[];
}

const TablesModal = ({
  isOpen,
  onClose,
  data,
  title,
  renderFields,
}: TablesModalProps) => {
  let imageUrl: string | undefined = '';

  // 寻找类型为'image'的字段，用于在表格上方展示图片（如果存在）
  if (data.length > 0 && renderFields) {
    const imageField = renderFields.find((field) => field.type === 'image');
    if (imageField && imageField.fieldName in data[0]) {
      const imageData = data[0][imageField.fieldName];
      imageUrl = typeof imageData === 'object' ? imageData.imageUrl : imageData;
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent minW={{ base: '90%', md: '600px', lg: '800px' }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {imageUrl && (
            <Center mb='4'>
              <Image
                src={imageUrl}
                boxSize='200px'
                objectFit='cover'
                alt='Profile Image'
              />
            </Center>
          )}
          {data.map((item, index) => (
            <Box key={index} mb='5'>
              <VStack spacing={3} alignItems='flex-start'>
                {renderFields
                  ?.filter(({ type }) => type !== 'image')
                  .map(({ fieldName, displayName }, idx) => (
                    <Box key={idx}>
                      <Text fontWeight='bold'>{displayName}:</Text>
                      <Text>{item[fieldName]}</Text>
                    </Box>
                  ))}
              </VStack>
            </Box>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TablesModal;

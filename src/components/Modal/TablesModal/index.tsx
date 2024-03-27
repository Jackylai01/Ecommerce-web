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
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface FieldSpec {
  fieldName: string;
  type: 'text' | 'image';
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
  const imageField = renderFields?.find((field) => field.type === 'image');

  let imageUrl: string | undefined;
  if (imageField) {
    const imageData = data[0][imageField.fieldName];
    imageUrl = typeof imageData === 'object' ? imageData.imageUrl : imageData;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent
        minW={{ base: '90%', md: '600px', lg: '800px' }}
        minH='500px'
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {imageUrl && (
            <Center mb='4'>
              <Image
                src={imageUrl}
                boxSize='100px'
                objectFit='cover'
                alt='Profile Image'
              />
            </Center>
          )}
          <Box overflowX='auto'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  {renderFields
                    ?.filter((field) => field.type !== 'image')
                    .map((field) => (
                      <Th key={field.fieldName}>{field.fieldName}</Th>
                    ))}
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr key={index}>
                    {renderFields
                      ?.filter((field) => field.type !== 'image')
                      .map(({ fieldName }, idx) => (
                        <td key={idx}>{item[fieldName]}</td>
                      ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TablesModal;

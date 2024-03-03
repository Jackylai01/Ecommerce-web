import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { CustomPageTemplate } from '@models/entities/custom-page-template';
import {
  FaEdit,
  FaHeading,
  FaLink,
  FaPodcast,
  FaRegImage,
  FaTable,
} from 'react-icons/fa';

type ContentSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: CustomPageTemplate) => void;
  templates: CustomPageTemplate[];
};

const ContentSelectionModal = ({
  isOpen,
  onClose,
  onSelect,
  templates,
}: ContentSelectionModalProps) => {
  const getIconForTemplate = (templateId: any) => {
    if (templateId.includes('img')) {
      return <FaRegImage />;
    } else if (templateId.includes('title')) {
      return <FaHeading />;
    } else if (templateId.includes('text')) {
      return <FaEdit />;
    } else if (templateId.includes('table')) {
      return <FaTable />;
    } else if (templateId.includes('link')) {
      return <FaLink />;
    } else if (templateId.includes('post')) {
      return <FaPodcast />;
    } else {
      return <FaRegImage />;
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>選擇模板</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <main
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {templates.map((template) => (
              <Button
                key={template._id}
                onClick={() => onSelect(template)}
                m={2}
              >
                {getIconForTemplate(template._id)}
              </Button>
            ))}
          </main>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            關閉
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContentSelectionModal;

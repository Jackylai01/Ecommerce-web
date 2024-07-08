import {
  Box,
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
import { reviewStatusMapping } from '@fixtures/shipment';

interface ReturnStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  refunds: any;
}

const ReturnStatusModal: React.FC<ReturnStatusModalProps> = ({
  isOpen,
  onClose,
  refunds,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>退貨狀態</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {refunds?.map((refund: any, index: number) => (
            <VStack align='start' spacing='20px' key={index}>
              <Box>
                <Text fontWeight='bold'>退貨編號:</Text> {refund._id}
              </Box>
              <Box>
                <Text fontWeight='bold'>申請日期:</Text>{' '}
                {new Date(refund.createdAt).toLocaleDateString()}
              </Box>
              <Box>
                <Text fontWeight='bold'>商品相片:</Text>
                {refund.images.map((image: any, index: number) => (
                  <Image
                    key={index}
                    src={image.imageUrl}
                    alt={`Product Image ${index + 1}`}
                    boxSize='100px'
                  />
                ))}
              </Box>
              <Box>
                <Text fontWeight='bold'>退貨原因:</Text> {refund.description}
              </Box>
              <Box>
                <Text fontWeight='bold'>退貨狀態:</Text>
                {reviewStatusMapping[refund.status]}
              </Box>
              <Box>
                <Text fontWeight='bold'>
                  退貨編號(請到原寄送門市列印退貨單):
                </Text>
                {refund.ecpayResponse.RtnOrderNo}
              </Box>
            </VStack>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReturnStatusModal;

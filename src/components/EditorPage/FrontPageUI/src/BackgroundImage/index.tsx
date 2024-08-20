import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react';
import { Component } from '@fixtures/componentLibrary';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { updateBlock } from '@reducers/admin/design-pages';
import { uploadImageAsync } from '@reducers/admin/design-pages/actions';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface BackgroundImageEditorProps {
  element: Component;
  index: number;
  isEdit: boolean;
  onBlur: () => void;
}

const BackgroundImageEditor: React.FC<BackgroundImageEditorProps> = ({
  element,
  index,
  isEdit,
  onBlur,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState(element.elements || []);
  const [imageWidth, setImageWidth] = useState(
    element.elements?.[0]?.style?.width || '0px',
  );
  const [imageHeight, setImageHeight] = useState(
    element.elements?.[0]?.style?.height || '0px',
  );
  const [widthUnit, setWidthUnit] = useState<string>('px');
  const [heightUnit, setHeightUnit] = useState<string>('px');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { uploadedImageUrls } = useAppSelector(
    (state) => state.adminDesignPage,
  );

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    elIndex: number,
    elementId: string,
  ) => {
    const elementUuid = products[elIndex].elementUuid;
    console.log(elIndex);
    console.log(elementId);
    console.log(elementUuid);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      dispatch(uploadImageAsync({ file, index, elementUuid, elementId }));
    }
  };

  // 更新背景圖片
  useEffect(() => {
    if (uploadedImageUrls && uploadedImageUrls.length > 0) {
      const newBackgroundImage =
        uploadedImageUrls[uploadedImageUrls.length - 1];
      const updatedProducts = products.map((product, elIndex) => {
        if (elIndex === 0) {
          return { ...product, src: newBackgroundImage };
        }
        return product;
      });
      setProducts(updatedProducts);

      // 更新 Redux 中的 block
      dispatch(
        updateBlock({
          index,
          block: { ...element, elements: updatedProducts },
        }),
      );
    }
  }, [uploadedImageUrls, dispatch, element, products, index]);

  const handleImageSizeChange = () => {
    const updatedProducts = products.map((product) => ({
      ...product,
      style: {
        ...product.style,
        width: `${imageWidth}${widthUnit}`,
        height: `${imageHeight}${heightUnit}`,
      },
    }));
    setProducts(updatedProducts);

    dispatch(
      updateBlock({ index, block: { ...element, elements: updatedProducts } }),
    );
    setIsModalOpen(false);
  };

  useEffect(() => {
    setProducts(element.elements || []);
  }, [element.elements]);

  useEffect(() => {
    const updatedProducts = (element.elements || []).map((el) => ({
      ...el,
      elementUuid: el.elementUuid || uuidv4(),
    }));
    setProducts(updatedProducts);
  }, [element.elements]);

  return (
    <Box display='flex' justifyContent='center'>
      {products.map((product, productIndex) => (
        <Box key={productIndex}>
          <a href={product.href} target='_blank' rel='noopener noreferrer'>
            <Image
              src={product.src}
              alt='Background'
              width={product.style?.width || `${imageWidth}${widthUnit}`}
              height={product.style?.height || `${imageHeight}${heightUnit}`}
              objectFit='cover'
            />
          </a>
        </Box>
      ))}

      {isEdit && (
        <>
          <IconButton
            icon={<EditIcon />}
            aria-label='編輯背景圖片'
            onClick={() => setIsModalOpen(true)}
            position='absolute'
            top='5px'
            right='5px'
          />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>編輯背景圖片設置</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mt={4}>
                  <FormLabel>上傳圖片</FormLabel>
                  <Input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={(e) =>
                      uploadImage(
                        e,
                        parseInt(
                          fileInputRef.current?.dataset.elIndex || '0',
                          10,
                        ),
                        fileInputRef.current?.dataset.elementId ||
                          'background-img',
                      )
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>圖片超連結</FormLabel>
                  <Input
                    type='url'
                    value={products[0]?.href || ''}
                    onChange={(e) => {
                      const updatedProducts = products.map((product, index) => {
                        if (index === 0) {
                          return { ...product, href: e.target.value };
                        }
                        return product;
                      });
                      setProducts(updatedProducts);

                      dispatch(
                        updateBlock({
                          index,
                          block: { ...element, elements: updatedProducts },
                        }),
                      );
                    }}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>圖片寬度</FormLabel>
                  <Box display='flex' alignItems='center'>
                    <NumberInput
                      value={
                        typeof imageWidth === 'string'
                          ? parseFloat(imageWidth)
                          : imageWidth
                      }
                      onChange={(valueString) => {
                        setImageWidth(valueString);
                        // 即時更新圖片寬度
                        setProducts((prevProducts) =>
                          prevProducts.map((product, productIndex) => ({
                            ...product,
                            style: {
                              ...product.style,
                              width: `${valueString}${widthUnit}`,
                            },
                          })),
                        );
                      }}
                      min={0}
                    >
                      <NumberInputField />
                    </NumberInput>
                    <Select
                      value={widthUnit}
                      onChange={(e) => {
                        setWidthUnit(e.target.value);
                        // 即時更新圖片寬度單位
                        setProducts((prevProducts) =>
                          prevProducts.map((product, productIndex) => ({
                            ...product,
                            style: {
                              ...product.style,
                              width: `${imageWidth}${e.target.value}`,
                            },
                          })),
                        );
                      }}
                      ml={2}
                      width='70px'
                    >
                      <option value='px'>px</option>
                      <option value='%'>%</option>
                    </Select>
                  </Box>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>圖片高度</FormLabel>
                  <Box display='flex' alignItems='center'>
                    <NumberInput
                      value={
                        typeof imageHeight === 'string'
                          ? parseFloat(imageHeight)
                          : imageHeight
                      }
                      onChange={(valueString) => {
                        setImageHeight(valueString);
                        // 即時更新圖片高度
                        setProducts((prevProducts) =>
                          prevProducts.map((product, productIndex) => ({
                            ...product,
                            style: {
                              ...product.style,
                              height: `${valueString}${heightUnit}`,
                            },
                          })),
                        );
                      }}
                      min={0}
                    >
                      <NumberInputField />
                    </NumberInput>
                    <Select
                      value={heightUnit}
                      onChange={(e) => {
                        setHeightUnit(e.target.value);
                        // 即時更新圖片高度單位
                        setProducts((prevProducts) =>
                          prevProducts.map((product, productIndex) => ({
                            ...product,
                            style: {
                              ...product.style,
                              height: `${imageHeight}${e.target.value}`,
                            },
                          })),
                        );
                      }}
                      ml={2}
                      width='70px'
                    >
                      <option value='px'>px</option>
                      <option value='%'>%</option>
                    </Select>
                  </Box>
                </FormControl>

                <Button
                  mt={4}
                  colorScheme='blue'
                  onClick={handleImageSizeChange}
                >
                  保存設置
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default BackgroundImageEditor;

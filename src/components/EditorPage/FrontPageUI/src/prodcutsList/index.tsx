import {
  Box,
  Button,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AddToCartButton } from '@components/Cart/AddToCartButton';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { Component } from '@fixtures/componentLibrary';
import { parseGradient } from '@helpers/gradient';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import { updateBlock } from '@reducers/admin/design-pages';
import { publicProductsListAsync } from '@reducers/public/products/actions';
import { Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

interface EnhancedShoppingHighlightsProps {
  index: number;
  element: Component;
  isEdit: boolean;
  onBlur: () => void;
}

const EnhancedShoppingHighlights: React.FC<EnhancedShoppingHighlightsProps> = ({
  index,
  element,
  isEdit,
  onBlur,
}) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backgroundType, setBackgroundType] = useState<
    'solid' | 'gradient' | 'color'
  >(
    element.style?.backgroundGradient
      ? 'gradient'
      : element.style?.backgroundColor
      ? 'color'
      : 'solid',
  );
  const initialGradient = element.style?.backgroundGradient
    ? parseGradient(element.style.backgroundGradient)
    : ['#fbbf24', '#f97316'];

  const [gradientStart, setGradientStart] = useState(initialGradient[0]);
  const [gradientEnd, setGradientEnd] = useState(initialGradient[1]);

  const [backgroundColor, setBackgroundColor] = useState(
    element.style?.backgroundColor || '#ffffff',
  );
  const [textColor, setTextColor] = useState(element.style?.color || '#000000');

  const {
    list: productsList,
    metadata,
    status: { productsListLoading },
  } = useAppSelector((state) => state.publicProducts);

  // 初次加載時調用獲取產品列表的 API
  useEffect(() => {
    dispatch(publicProductsListAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleBackgroundChange = (
    type: 'solid' | 'gradient',
    color: string,
  ) => {
    if (type === 'solid') {
      setBackgroundColor(color);
      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundColor: color,
              backgroundGradient: '', // 清除漸層背景
            },
          },
        }),
      );
    } else if (type === 'gradient') {
      const newGradient = `linear-gradient(to right, ${gradientStart}, ${color})`;
      setGradientEnd(color);

      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundGradient: newGradient,
              backgroundColor: '',
            },
          },
        }),
      );
    }
  };

  const handleBackgroundSave = () => {
    if (backgroundType === 'solid') {
      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundColor,
              backgroundGradient: '', // 清除漸層背景
            },
          },
        }),
      );
    } else if (backgroundType === 'gradient') {
      const newBackgroundGradient = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;

      dispatch(
        updateBlock({
          index,
          block: {
            ...element,
            style: {
              ...element.style,
              backgroundColor: '', // 清除單色背景
              backgroundGradient: newBackgroundGradient,
            },
          },
        }),
      );
    }
    onClose(); // 關閉彈窗
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    dispatch(
      updateBlock({
        index,
        block: {
          ...element,
          style: {
            ...element.style,
            color: color,
          },
        },
      }),
    );
  };

  return (
    <LoadingLayout isLoading={productsListLoading}>
      <Box
        className={element.className}
        style={{
          background:
            backgroundType === 'gradient'
              ? `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
              : backgroundColor,
          color: textColor,
        }}
      >
        <Box
          as='h2'
          className={element.elements?.find((e) => e.id === 'title')?.className}
          style={{ color: textColor }}
        >
          {element.elements?.find((e) => e.id === 'title')?.context ||
            '產品列表'}
        </Box>
        {productsList && (
          <Box
            as='main'
            className={
              element.elements?.find((e) => e.id === 'product_grid')?.className
            }
          >
            {productsList.map((item) => (
              <Box
                as='section'
                key={item._id}
                className={
                  element.elements?.find((e) => e.id === 'product_item')
                    ?.className
                }
                style={{ color: textColor }}
              >
                <Box
                  as='article'
                  className={
                    element.elements?.find(
                      (e) => e.id === 'product_image_container',
                    )?.className
                  }
                >
                  <Link href={`/products/${item._id}-${item.slug}`}>
                    <Image
                      src={item.coverImage.imageUrl}
                      alt='封面圖片'
                      className={
                        element.elements?.find((e) => e.id === 'product_image')
                          ?.className
                      }
                      boxSize='full'
                      objectFit='cover'
                      maxHeight='18rem'
                      borderRadius='lg'
                    />
                  </Link>
                </Box>
                <Box
                  as='section'
                  className={
                    element.elements?.find((e) => e.id === 'product_content')
                      ?.className
                  }
                  style={{ color: textColor }} // 套用全域的文字顏色
                >
                  <Box
                    as='h3'
                    className={
                      element.elements?.find((e) => e.id === 'product_title')
                        ?.className
                    }
                    style={{ color: textColor }}
                  >
                    {item.name}
                  </Box>
                  <Box
                    as='p'
                    className={
                      element.elements?.find(
                        (e) => e.id === 'product_description',
                      )?.className
                    }
                  >
                    {item.description}
                  </Box>
                  <Box
                    as='aside'
                    className={
                      element.elements?.find((e) => e.id === 'product_footer')
                        ?.className
                    }
                  >
                    <Box
                      as='span'
                      className={
                        element.elements?.find((e) => e.id === 'product_price')
                          ?.className
                      }
                    >
                      {item.price}
                    </Box>
                  </Box>
                </Box>
                <AddToCartButton product={item} />
              </Box>
            ))}
          </Box>
        )}
        {metadata && <Pagination metadata={metadata} />}
      </Box>

      {isEdit && (
        <IconButton
          icon={<Edit2 />}
          aria-label='設定背景'
          onClick={onOpen}
          variant='outline'
          zIndex='100'
          position='absolute'
          left='100px'
          top='10%'
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>設定背景</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display='flex' mb={2}>
              <Button
                mr={2}
                onClick={() => setBackgroundType('solid')}
                isActive={backgroundType === 'solid'}
              >
                單色
              </Button>
              <Button
                mr={2}
                onClick={() => setBackgroundType('gradient')}
                isActive={backgroundType === 'gradient'}
              >
                漸層
              </Button>
              <Button
                onClick={() => setBackgroundType('color')}
                isActive={backgroundType === 'color'}
              >
                文字顏色
              </Button>
            </Box>

            {backgroundType === 'solid' && (
              <SketchPicker
                color={backgroundColor}
                onChangeComplete={(color) =>
                  handleBackgroundChange('solid', color.hex)
                }
              />
            )}

            {backgroundType === 'gradient' && (
              <Box>
                <Box>起始顏色</Box>
                <SketchPicker
                  color={gradientStart}
                  onChangeComplete={(color) => setGradientStart(color.hex)}
                />
                <Box mt={2}>結束顏色</Box>
                <SketchPicker
                  color={gradientEnd}
                  onChangeComplete={(color) =>
                    handleBackgroundChange('gradient', color.hex)
                  }
                />
              </Box>
            )}

            {backgroundType === 'color' && (
              <SketchPicker
                color={textColor}
                onChangeComplete={(color) => handleColorChange(color.hex)}
              />
            )}

            <Button mt={4} onClick={handleBackgroundSave}>
              確認
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </LoadingLayout>
  );
};

export default EnhancedShoppingHighlights;

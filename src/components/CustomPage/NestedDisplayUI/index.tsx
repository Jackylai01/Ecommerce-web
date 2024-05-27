import generateUUID from '@helpers/generate-uuid';
import { CustomPageElement } from '@models/entities/custom-page-template';
import EditableTable from './src/EditableTable';
import Icon from './src/Icon';
import LoginBlock from './src/LoginBlock';
import SelectableImage from './src/SelectableImage';
import TagElement from './src/TagElement';
import Items from './src/items';

type Props = {
  elements: CustomPageElement[];
  isEdit: boolean;
  onImageUpdate?: any;
  onBlur?: () => void; // 添加 onBlur 回调
};

export type ElementProps = {
  element: CustomPageElement;
  isEdit: boolean;
  id?: string | any;
  onImageUpdate?: any;
  onBlur?: () => void; // 添加 onBlur 回调
};

const NestedDisplayUI = ({
  elements,
  isEdit = true,
  onImageUpdate,
  onBlur,
}: Props) => {
  if (!elements || !elements.length) return <></>;

  return (
    <>
      {elements.map((element) => {
        switch (element.tagName) {
          case 'loginBlock':
            return <LoginBlock key={generateUUID()} />;
          case 'icon':
            return (
              <Icon key={generateUUID()} element={element} isEdit={isEdit} />
            );
          case 'items':
            return (
              <Items key={generateUUID()} element={element} isEdit={isEdit} />
            );
          case 'img':
            return (
              <SelectableImage
                key={element.id || generateUUID()}
                element={element}
                isEdit={isEdit}
                onImageUpdate={onImageUpdate}
              />
            );
          case 'table':
            return (
              <EditableTable
                key={element.id || generateUUID()}
                element={element}
                isEdit={isEdit}
                onBlur={onBlur}
              />
            );
          default:
            return (
              <TagElement
                key={element.id || generateUUID()}
                element={element}
                isEdit={isEdit}
                onBlur={onBlur}
              />
            );
        }
      })}
    </>
  );
};

export default NestedDisplayUI;

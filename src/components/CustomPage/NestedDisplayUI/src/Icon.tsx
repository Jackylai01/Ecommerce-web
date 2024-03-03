import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { iconSelectReset, setSelectActive } from '@reducers/icon-select';
import { useEffect, useMemo } from 'react';
import { ElementProps } from '..';

const Icon = ({ element, isEdit }: ElementProps) => {
  const dispatch = useAppDispatch();

  const name = useMemo(() => generateUUID(), []);

  const { currentIconClass, iconName } = useAppSelector(
    (store) => store.iconSelect,
  );

  useEffect(() => {
    if (currentIconClass && iconName === name) {
      element.className = currentIconClass;
      dispatch(iconSelectReset());
    }
  }, [dispatch, element, iconName, currentIconClass, name]);

  if (!isEdit) return <span className={element.className}></span>;
  return (
    <span
      className={element.className}
      style={{ cursor: 'pointer' }}
      onClick={() =>
        dispatch(setSelectActive({ active: true, iconName: name }))
      }
    ></span>
  );
};

export default Icon;

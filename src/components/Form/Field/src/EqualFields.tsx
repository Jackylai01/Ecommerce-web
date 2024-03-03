import Field, { InnerProps } from '..';

const EqualFields = ({ watch, fieldConfig: { fieldConfigs } }: InnerProps) => {
  if (!fieldConfigs) return <></>;

  return (
    <>
      <Field fieldConfig={fieldConfigs[0]} />
      <Field
        fieldConfig={{
          ...fieldConfigs[1],
          validate: (value: string) =>
            value === watch(fieldConfigs[0].name) ||
            `${fieldConfigs[1].label} 與  ${fieldConfigs[0].label} 並未相同`,
        }}
      />
    </>
  );
};

export default EqualFields;

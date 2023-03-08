import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { shallow } from 'zustand/shallow';

import { CAW_APP, CAW_APPS_OPTIONS } from 'src/types';
import { useTranslationsStore } from 'src/store';

export function CawPlatform() {

  const { app, changeApp } = useTranslationsStore(
    (state) => ({ app: state.application, changeApp: state.toogleApplication }),
    shallow
  );

  return (
    <RadioGroup defaultValue={app} mt={3}>
      <Stack spacing={5} direction='row'>
        {CAW_APPS_OPTIONS.map((value) => {
          return (
            <Radio
              colorScheme='orange'
              key={value.app}
              value={value.app}
              onChange={(e) => { changeApp(e.target.value as CAW_APP) }}
            >
              {value.name}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
}
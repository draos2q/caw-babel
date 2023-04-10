import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { shallow } from 'zustand/shallow';

import { usePageStore } from "~/src/store/PageStore";
import { CAW_APP, CAW_APPS_OPTIONS } from 'src/types';

export default function PlatformController() {

  const { platform, locked, changeApp } = usePageStore(state => ({
    platform: state.platform,
    locked: state.translate_controls_locked,
    changeApp: state.changeSelectedApp
  }), shallow);

  return (
    <RadioGroup defaultValue={platform} mt={3}>
      <Stack spacing={5} direction='row'>
        {CAW_APPS_OPTIONS.map((value) => {
          return (
            <Radio
              disabled={locked}
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
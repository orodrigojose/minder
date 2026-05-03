import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { getSettings, updateSettings } from "../utils/api";
import type { SettingsType } from "../types/types";

interface SettingsContextType {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
  update: (newSettings: SettingsType) => void;
}

const initialSettings: SettingsType = {
  id: "",
  fontSize: 16,
  theme: "classic-dark",
  placeholder: "",

  topBar: false,
  toolBar: false,

  titleText: "",
  welcomeText: "",
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  setSettings: () => {},
  update: () => {},
});

interface Props {
  children: ReactNode;
}

const SettingsContextProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<SettingsType>(initialSettings);

  useEffect(() => {
    const setupSettings = async () => {
      const response = await getSettings();

      const newSettings = response?.data ?? response;
      if (newSettings) setSettings(newSettings);
    };

    setupSettings();
  }, []);

  const update = async (newSettings: SettingsType) => {
    const response = await updateSettings(newSettings);
    const updated = response?.data ?? response;
    if (updated) setSettings(updated);

    return response;
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, update }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;

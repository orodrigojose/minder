package dev.rodrigojose.minder.application.usecases.settings;

import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaSettingsEntity;
import dev.rodrigojose.minder.domain.settings.Settings;

@Service
public class GetDefaultSettings {

  public Settings execute() {
    JpaSettingsEntity defaultSettings = new JpaSettingsEntity();

    defaultSettings.setTheme("classic");
    defaultSettings.setFontSize(16);
    defaultSettings.setPlaceholder("Type / to see commands...");

    defaultSettings.setTopBar(false);
    defaultSettings.setToolBar(false);

    defaultSettings.setTitleText("Minder");
    defaultSettings.setWelcomeText("Welcome to the Minder Editor");

    return new Settings(
        defaultSettings.getId(),
        defaultSettings.getTheme(),
        defaultSettings.getFontSize(),
        defaultSettings.getPlaceholder(),

        defaultSettings.getTopBar(),
        defaultSettings.getToolBar(),

        defaultSettings.getTitleText(),
        defaultSettings.getWelcomeText());
  }

}
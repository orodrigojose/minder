package dev.rodrigojose.minder.application.usecases.settings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaSettingsEntity;
import dev.rodrigojose.minder.adapters.outbound.repositories.JpaSettingsRepository;
import dev.rodrigojose.minder.domain.settings.Settings;

@Service
public class CreateSettings {
  @Autowired
  private JpaSettingsRepository repository;

  public Settings execute() {
    JpaSettingsEntity defaultSettings = new JpaSettingsEntity();

    defaultSettings.setTheme("classic");
    defaultSettings.setFontSize(16);
    defaultSettings.setPlaceholder("Type / to see commands...");

    defaultSettings.setTopBar(false);
    defaultSettings.setToolBar(false);

    defaultSettings.setTitleText("Minder");
    defaultSettings.setWelcomeText("Welcome to the Minder Editor");

    JpaSettingsEntity saved = repository.save(defaultSettings);

    return new Settings(
        saved.getId(),
        saved.getTheme(),
        saved.getFontSize(),
        saved.getPlaceholder(),

        saved.getTopBar(),
        saved.getToolBar(),

        saved.getTitleText(),
        saved.getWelcomeText());
  }

  public Settings execute(Settings userSettings) {

    JpaSettingsEntity defaultSettings = new JpaSettingsEntity();

    defaultSettings.setTheme("classic");
    defaultSettings.setFontSize(16);
    defaultSettings.setPlaceholder("Type / to see commands...");

    defaultSettings.setTopBar(false);
    defaultSettings.setToolBar(false);

    defaultSettings.setTitleText("Minder");
    defaultSettings.setWelcomeText("Welcome to the Minder Editor");

    JpaSettingsEntity saved = repository.save(defaultSettings);

    return new Settings(
        saved.getId(),
        saved.getTheme(),
        saved.getFontSize(),
        saved.getPlaceholder(),

        saved.getTopBar(),
        saved.getToolBar(),

        saved.getTitleText(),
        saved.getWelcomeText());
  }
}

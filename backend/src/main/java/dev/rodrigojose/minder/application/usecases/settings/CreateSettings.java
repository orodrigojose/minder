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

    defaultSettings.setTheme("classic-dark");
    defaultSettings.setFontSize("10pt");
    defaultSettings.setSlashCommands(true);

    JpaSettingsEntity saved = repository.save(defaultSettings);

    return new Settings(
        saved.getId(),
        saved.getFontSize(),
        saved.getTheme(),
        saved.getSlashCommands());
  }

  public Settings execute(Settings userSettings) {

    JpaSettingsEntity defaultSettings = new JpaSettingsEntity();

    defaultSettings.setTheme(userSettings.getTheme());
    defaultSettings.setFontSize(userSettings.getFontSize());
    defaultSettings.setSlashCommands(userSettings.getSlashCommands());

    JpaSettingsEntity saved = repository.save(defaultSettings);

    return new Settings(
        saved.getId(),
        saved.getFontSize(),
        saved.getTheme(),
        saved.getSlashCommands());
  }
}

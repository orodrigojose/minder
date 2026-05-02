package dev.rodrigojose.minder.application.usecases.settings;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.SettingsRepositoryImpl;
import dev.rodrigojose.minder.domain.settings.Settings;

@Service
public class UpdateSettings {
  @Autowired
  private SettingsRepositoryImpl repository;

  @Autowired
  private CreateSettings createSettings;

  public Settings execute(Settings newSettings) {
    List<Settings> all = this.repository.findAll();

    if (all.isEmpty()) {
      Settings savedSettings = this.createSettings.execute(newSettings);

      return savedSettings;
    }

    Settings settings = all.get(0);

    if (newSettings.getTheme() != null)
      settings.setTheme(newSettings.getTheme());
    if (newSettings.getFontSize() != null)
      settings.setFontSize(newSettings.getFontSize());
    if (newSettings.getSlashCommands() != null)
      settings.setSlashCommands(newSettings.getSlashCommands());

    return repository.save(settings);
  }

}

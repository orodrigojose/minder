package dev.rodrigojose.minder.application.usecases.settings;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.SettingsRepositoryImpl;
import dev.rodrigojose.minder.domain.settings.Settings;

@Service
public class GetSettings {
  @Autowired
  private SettingsRepositoryImpl repository;

  @Autowired
  private CreateSettings createSettings;

  public Settings execute() {
    List<Settings> all = this.repository.findAll();

    if (all.isEmpty()) {
      return this.createSettings.execute();
    }

    Settings settings = all.get(0);

    return new Settings(
        settings.getId(),
        settings.getFontSize(),
        settings.getTheme(),
        settings.getSlashCommands());
  }
}

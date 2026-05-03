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
    if (newSettings.getFontSize() != null && settings.getFontSize() <= 40 && settings.getFontSize() >= 10)
      settings.setFontSize(newSettings.getFontSize());
    if (newSettings.getPlaceholder() != null)
      settings.setPlaceholder(newSettings.getPlaceholder());

    if (newSettings.getTopBar() != null)
      settings.setTopBar(newSettings.getTopBar());
    if (newSettings.getToolBar() != null)
      settings.setToolBar(newSettings.getToolBar());

    if (newSettings.getTitleText() != null)
      settings.setTitleText(newSettings.getTitleText());
    if (newSettings.getWelcomeText() != null)
      settings.setWelcomeText(newSettings.getWelcomeText());

    return repository.save(settings);
  }

}

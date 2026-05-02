package dev.rodrigojose.minder.domain.settings;

import java.util.List;

public interface SettingsRepository {
  Settings save(Settings settings);
  Settings get();
  Settings getDefault();
  List<Settings> findAll();
}

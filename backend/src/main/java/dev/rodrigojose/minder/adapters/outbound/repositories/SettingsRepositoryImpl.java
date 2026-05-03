package dev.rodrigojose.minder.adapters.outbound.repositories;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaSettingsEntity;
import dev.rodrigojose.minder.domain.settings.Settings;
import dev.rodrigojose.minder.domain.settings.SettingsRepository;

@Repository
public class SettingsRepositoryImpl implements SettingsRepository {
  @Autowired
  private JpaSettingsRepository repository;

  @Override
  public Settings save(Settings settings) {
    JpaSettingsEntity settingsEntity = new JpaSettingsEntity(settings);
    this.repository.save(settingsEntity);

    return toDomain(settingsEntity);
  }

  @Override
  public Settings get() {
    List<JpaSettingsEntity> all = repository.findAll();
    return toDomain(all.get(0));
  }

  @Override
  public Settings getDefault() {
    JpaSettingsEntity defaultEntity = new JpaSettingsEntity();

    defaultEntity.setTheme("classic");
    defaultEntity.setFontSize(16);
    defaultEntity.setPlaceholder("Type / to see commands...");

    defaultEntity.setTopBar(false);
    defaultEntity.setToolBar(false);

    defaultEntity.setTitleText("Minder");
    defaultEntity.setWelcomeText("Welcome to the Minder Editor");

    JpaSettingsEntity saved = repository.save(defaultEntity);

    return toDomain(saved);
  }

  @Override
  public List<Settings> findAll() {
    return this.repository.findAll().stream()
        .map(settings -> new Settings(
            settings.getId(),
            settings.getTheme(),
            settings.getFontSize(),
            settings.getPlaceholder(),

            settings.getTopBar(),
            settings.getToolBar(),

            settings.getTitleText(),
            settings.getWelcomeText()))
        .collect(Collectors.toList());
  }

  public Settings update(Settings settings) {
    JpaSettingsEntity entity = new JpaSettingsEntity(settings);
    JpaSettingsEntity saved = repository.save(entity);
    return toDomain(saved);
  }

  private Settings toDomain(JpaSettingsEntity entity) {
    return new Settings(
        entity.getId(),
        entity.getTheme(),
        entity.getFontSize(),
        entity.getPlaceholder(),

        entity.getTopBar(),
        entity.getToolBar(),

        entity.getTitleText(),
        entity.getWelcomeText());
  }

}
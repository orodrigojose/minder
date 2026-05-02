package dev.rodrigojose.minder.adapters.outbound.entities;

import java.util.UUID;

import dev.rodrigojose.minder.domain.settings.Settings;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

@Entity
@Table(name = "settings")
public class JpaSettingsEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;
  private String theme;
  private String fontSize;
  private Boolean slashCommands;

  public JpaSettingsEntity() {}

  public JpaSettingsEntity(Settings settings) {
    this.id = settings.getId();
    this.theme = settings.getTheme();
    this.fontSize = settings.getFontSize();
    this.slashCommands = settings.getSlashCommands();
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getTheme() {
    return theme;
  }

  public void setTheme(String theme) {
    this.theme = theme;
  }

  public String getFontSize() {
    return fontSize;
  }

  public void setFontSize(String fontSize) {
    this.fontSize = fontSize;
  }

  public Boolean getSlashCommands() {
    return slashCommands;
  }

  public void setSlashCommands(Boolean slashCommands) {
    this.slashCommands = slashCommands;
  }
}
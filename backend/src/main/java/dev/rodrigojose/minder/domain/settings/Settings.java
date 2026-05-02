package dev.rodrigojose.minder.domain.settings;

import java.util.UUID;

public class Settings {
  private UUID id;
  private String theme;
  private String fontSize;
  private Boolean slashCommands;

  public Settings() {
  }

  public Settings(UUID id, String fontSize, String theme, Boolean slashCommands) {
    this.id = id;
    this.theme = theme;
    this.fontSize = fontSize;
    this.slashCommands = slashCommands;
  }

  public UUID getId() {
    return id;
  }

  public String getTheme() {
    return theme;
  }

  public Boolean getSlashCommands() {
    return slashCommands;
  }

  public String getFontSize() {
    return fontSize;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public void setTheme(String theme) {
    this.theme = theme;
  }

  public void setSlashCommands(Boolean slashCommands) {
    this.slashCommands = slashCommands;
  }

  public void setFontSize(String fontSize) {
    this.fontSize = fontSize;
  }

}
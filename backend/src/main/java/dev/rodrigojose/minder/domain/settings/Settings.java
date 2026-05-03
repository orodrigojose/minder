package dev.rodrigojose.minder.domain.settings;

import java.util.UUID;

public class Settings {
  private UUID id;
  private String theme;
  private Integer fontSize;
  private String placeholder;

  private Boolean topBar;
  private Boolean toolBar;

  private String titleText;
  private String welcomeText;

  public Settings() {
  }

  public Settings(UUID id, String theme, Integer fontSize, String placeholder, Boolean topBar, Boolean toolBar,
      String titleText, String welcomeText) {
    this.id = id;
    this.theme = theme;
    this.fontSize = fontSize;
    this.placeholder = placeholder;

    this.topBar = topBar;
    this.toolBar = toolBar;

    this.titleText = titleText;
    this.welcomeText = welcomeText;
  }

  public UUID getId() {
    return id;
  }

  public String getTheme() {
    return theme;
  }

  public Integer getFontSize() {
    return fontSize;
  }

  public String getPlaceholder() {
    return placeholder;
  }

  public Boolean getTopBar() {
    return topBar;
  }

  public Boolean getToolBar() {
    return toolBar;
  }

  public String getTitleText() {
    return titleText;
  }

  public String getWelcomeText() {
    return welcomeText;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public void setTheme(String theme) {
    this.theme = theme;
  }

  public void setFontSize(Integer fontSize) {
    this.fontSize = fontSize;
  }

  public void setPlaceholder(String placeholder) {
    this.placeholder = placeholder;
  }

  public void setTopBar(Boolean topBar) {
    this.topBar = topBar;
  }

  public void setToolBar(Boolean toolBar) {
    this.toolBar = toolBar;
  }

  public void setTitleText(String titleText) {
    this.titleText = titleText;
  }

  public void setWelcomeText(String welcomeText) {
    this.welcomeText = welcomeText;
  }
}
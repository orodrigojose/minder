package dev.rodrigojose.minder.adapters.outbound.entities;

import java.util.UUID;

import dev.rodrigojose.minder.domain.settings.Settings;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "settings")
public class JpaSettingsEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;
  private String theme;
  private Integer fontSize;
  private String placeholder;

  private Boolean topBar;
  private Boolean toolBar;

  private String titleText;
  private String welcomeText;

  public JpaSettingsEntity() {
  }

  public JpaSettingsEntity(Settings settings) {
    this.id = settings.getId();
    this.theme = settings.getTheme();
    this.fontSize = settings.getFontSize();
    this.placeholder = settings.getPlaceholder();

    this.topBar = settings.getTopBar();
    this.toolBar = settings.getToolBar();

    this.titleText = settings.getTitleText();
    this.welcomeText = settings.getWelcomeText();
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
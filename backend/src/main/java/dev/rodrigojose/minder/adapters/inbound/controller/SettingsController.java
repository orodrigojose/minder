package dev.rodrigojose.minder.adapters.inbound.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.rodrigojose.minder.application.usecases.settings.GetSettings;
import dev.rodrigojose.minder.application.usecases.settings.UpdateSettings;
import dev.rodrigojose.minder.domain.settings.Settings;
import dev.rodrigojose.minder.infrastructure.StandardResponseDto;

@CrossOrigin
@RestController
@RequestMapping("/settings")
public class SettingsController {
  @Autowired
  private GetSettings getSettings;

  @Autowired
  private UpdateSettings updateSettings;

  @GetMapping("/")
  public ResponseEntity<StandardResponseDto<Settings>> getOrCreateSettings() {
    Settings settings = getSettings.execute();

    StandardResponseDto<Settings> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Settings returned with successfully!",
        settings);

    return ResponseEntity.ok(response);
  }

  @GetMapping("/default")
  public Settings getDefaultSettings() {
    Settings settings = getSettings.execute();
    return settings;
  }

  @PutMapping("/update/")
  public ResponseEntity<StandardResponseDto<Settings>> updateSettings(@RequestBody Settings settings) {

    Settings updatedSettings = updateSettings.execute(settings);

    StandardResponseDto<Settings> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Settings updated with successfully!",
        updatedSettings);

    return ResponseEntity.ok(response);
  }

}

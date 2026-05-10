<div align="center">
  <img src="frontend/public/assets/logo.png" width="164" height="164">
  <h1>Minder</h1>
  <span>Your next favorite editor, offering more practicality and productivity in your studies.</span>
</div>

<br/>
<div align="center">

![React](https://img.shields.io/badge/React-000000?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-000000?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-000000?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-000000?logo=tailwindcss&logoColor=white)
![React Flow](https://img.shields.io/badge/React%20Flow-000000?logo=react&logoColor=white)
![Milkdown](https://img.shields.io/badge/Milkdown-000000)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-000000?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-000000?logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-000000?logo=apachemaven&logoColor=white)
![H2](https://img.shields.io/badge/H2-000000)
![Docker](https://img.shields.io/badge/Docker%20Compose-000000?logo=docker&logoColor=white)

</div>

---

## Index
- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Clean architecture](#clean-architecture)
- [System design](#system-design-overview)
- [API design](#api-design-routes-and-flows)
- [Useful commands](#useful-commands)

## Overview
Minder is a Markdown editor for study notes. It keeps things focused on a mindmap: each node is a Markdown file, and edges link related ideas so you can jump around fast.

The system is split into:
- Frontend (Vite + React): mindmap UI and Markdown editor.
- Backend (Spring Boot): CRUD for nodes, edges, files, and settings.
- Local workspace: stores `.md` files and database.

## Tech stack
Frontend:
- React, Vite, TypeScript, TailwindCSS, React Flow, Milkdown.

Backend:
- Spring Boot, Java 21, H2, Spring Data JPA.

Infra:
- Docker + Docker Compose.

## Requirements
- Docker Engine with Docker Compose (plugin or docker-compose).
- Git to clone the repository.

## Quick start
Linux/macOS:
```bash
git clone https://github.com/orodrigojose/minder.git
cd minder/
ln -sf "$PWD/scripts/minder" "$HOME/.local/bin/minder"
chmod +x scripts/minder
minder up
```

Windows (PowerShell):
```powershell
git clone https://github.com/orodrigojose/minder.git
cd minder
$bin = "$HOME\bin"
New-Item -ItemType Directory -Force $bin | Out-Null
New-Item -ItemType SymbolicLink -Path "$bin\minder.cmd" -Target "$PWD\scripts\minder.cmd"
minder up
```

`minder up` creates `.env` if missing and opens the app at `http://localhost:8080`.

If an existing H2 database was created with different credentials, set `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` in `.env`.

## Clean architecture
Backend follows a Clean Architecture layout:
- `domain`: core entities and business rules.
- `application/usecases`: application services and orchestration.
- `adapters/inbound`: REST controllers.
- `adapters/outbound`: JPA repositories and persistence adapters.
- `infrastructure`: shared configs, exception handlers, and response DTOs.

## System design (overview)
```mermaid
flowchart LR
  subgraph FE[Frontend - Vite/React]
    FE_Mapa[Mindmap - React Flow]
    FE_Editor[Editor - Milkdown]
    FE_Settings[Settings UI]
  end

  subgraph BE[Backend - Spring Boot]
    API_Node[Node API]
    API_Edge[Edge API]
    API_File[File API]
    API_Settings[Settings API]
  end

  subgraph WS[Local workspace]
    WS_Notes[.minder/nodes/*.md]
  end

  FE_Mapa <-->|/node + /edge| API_Node
  FE_Mapa <-->|/edge| API_Edge
  FE_Editor <-->|/node/file + /file| API_File
  FE_Settings <-->|/settings| API_Settings

  API_Node --> WS_Notes
  API_File --> WS_Notes
```

## API design (routes and flows)
```mermaid
flowchart LR
  subgraph FE[Frontend]
    FE_Mapa["Mindmap"]
    FE_Editor["Editor"]
    FE_Settings["Settings"]
  end

  subgraph API[Backend - REST]
    subgraph NodeAPI["Node API (/node)"]
      N1["GET /node/"]
      N2["POST /node/create"]
      N3["PUT /node/update/:id"]
      N4["DELETE /node/delete/:id"]
      N5["GET /node/file/:id"]
    end

    subgraph EdgeAPI["Edge API (/edge)"]
      E1["GET /edge/"]
      E2["POST /edge/create"]
      E3["DELETE /edge/delete/:id"]
    end

    subgraph FileAPI["File API (/file)"]
      F1["PUT /file/update/:id"]
      F2["POST /file/assets/upload"]
      F3["DELETE /file/assets/upload/:file"]
    end

    subgraph SettingsAPI["Settings API (/settings)"]
      S1["GET /settings/"]
      S2["GET /settings/default/"]
      S3["PUT /settings/update/"]
    end
  end

  FE_Mapa --> N1
  FE_Mapa --> N2
  FE_Mapa --> N3
  FE_Mapa --> N4
  FE_Mapa --> E1
  FE_Mapa --> E2
  FE_Mapa --> E3

  FE_Editor --> N5
  FE_Editor --> F1
  FE_Editor --> F2
  FE_Editor --> F3

  FE_Settings --> S1
  FE_Settings --> S2
  FE_Settings --> S3
```

## Useful commands
- `minder up [workspace_path]`: start the app and create the workspace.
- `minder rebuild [workspace_path]`: rebuild the image and start the app.
- `minder down`: stop containers.
- `minder logs`: follow logs.
- `minder status`: show container status.
- `minder open`: open the app in the browser.
- `minder ls [workspace_path]`: list workspace files.

---

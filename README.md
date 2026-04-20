

<div align="center">
  <img src="frontend/public/assets/logo.png">
  <h1>Minder</h1>
  <span>Your next favorite editor, offering more practicality and productivity in your studies.</span>
</div>

### How to install and use?
1. Clone git repository.
```bash
git clone https://github.com/orodrigojose/minder.git
cd minder/
```

2. Setup binary file:

Linux:
```bash
ln -sf "$PWD/scripts/minder" "$HOME/.local/bin/minder"
chmod +x scripts/minder
```

Windows:
Create a folder that is on your `PATH` and place `minder.cmd` there.

Example with PowerShell:
```powershell
$bin = "$HOME\bin"
New-Item -ItemType Directory -Force $bin | Out-Null
New-Item -ItemType SymbolicLink -Path "$bin\minder.cmd" -Target "$PWD\scripts\minder.cmd"
```

If symbolic links are not available, copy `scripts/minder.cmd` into that folder instead.

3. Setup application:

Copy the example environment file and adjust it if needed:
```bash
cp .env.example .env
```

Default values:
- `MINDER_PORT=8080`
- `MINDER_WORKSPACE_PATH=./workspace`

Start the application:
```bash
./scripts/minder up
```

Windows:
```powershell
Copy-Item .env.example .env
minder up
```
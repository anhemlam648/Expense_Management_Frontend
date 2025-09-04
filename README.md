This project provides a minimal setup for using **React** with **Vite**, including Hot Module Replacement (HMR) and ESLint configuration.

## 🔧 Features

- ⚡️ Ultra-fast dev server powered by [Vite](https://vitejs.dev)
- ♻️ Hot Module Replacement (HMR)
- ✅ Preconfigured ESLint for clean code
- 🔌 Support for:
  - [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) (uses Babel)
  - [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc) (uses SWC)

---

## ⚠️ Important: Node.js Version Requirement

> **Vite requires Node.js version `>= 20.19.0` or `>= 22.12.0`.**

If you're using an older version, you may encounter errors like:


### How to update Node.js on Windows with NVM

We recommend using [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) to manage Node.js versions easily.

1. Download the latest **nvm-setup.zip** or **nvm-setup.exe** from the Assets on the [nvm-windows releases page](https://github.com/coreybutler/nvm-windows/releases) and install it.

2. After installation, **close all open PowerShell or CMD windows**, then open a **new PowerShell window as Administrator**.

3. In PowerShell, run the following commands to install and switch to Node.js version 22.12.0:

```powershell
nvm install 22.12.0
nvm use 22.12.0

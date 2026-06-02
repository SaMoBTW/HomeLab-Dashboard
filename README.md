# 🖥️ HomeLab Command Center Dashboard

Welcome to the **HomeLab Command Center Dashboard**, a sleek, high-tech, HUD-inspired dashboard designed to monitor and manage your home server and virtualized environments. Built on a modular React architecture with Vite and Tailwind CSS, this interface offers real-time visualization, customizable layouts, and administrative utilities.

---

## ✨ Features

- **📊 Real-time Metrics Simulation**:
  - Live tracking of CPU usage, Memory load, Storage consumption, and Network bandwidth (inbound/outbound traffic).
  - Integrates dynamic sparklines and interactive Recharts graphs.
- **🐳 Container Management**:
  - A robust dashboard for tracking Docker container status (Running, Paused, Exited).
  - Actionable triggers to **Start**, **Stop**, and **Restart** containers in real-time.
  - Quick-search filter by container name or image tag.
- **🐚 HUD Terminal Simulator**:
  - Integrated command-line simulator with command history tracking.
  - Supports standard mock utilities: `docker ps`, `docker stats`, `df -h`, `uptime`, `ls`, `pwd`, `whoami`, and interactive `ping`.
- **🧭 Dynamic Navigation Modalities**:
  - Toggle between three distinct layout models on the fly:
    1. **Pages**: Full URL-routed multi-page layout.
    2. **Tabs**: State-based view switcher.
    3. **Scroll**: Compact single-page vertical scroller.
- **🏗️ Customizable Layout (Drag-and-Drop)**:
  - Toggle Customize mode to reposition and resize widgets seamlessly via `react-grid-layout` with persistence in LocalStorage.
- **🔗 Smart Service Link Hub**:
  - Centralized portal for common homelab services (Plex, Home Assistant, Pi-hole, etc.) categorized by type with active health/status indicators.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons, Glassmorphism design system
- **Layout**: `react-grid-layout` (for custom dashboard layouts)
- **Charts**: `recharts` (for high-fidelity network & hardware graphs)
- **Routing**: `react-router-dom`

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── layout/       # Grid systems and widget wrappers
│   │   ├── navigation/   # NavLinks and Navigation Mode switchers
│   │   ├── shell/        # TopBar, Sidebar, AppShell layout wrappers
│   │   └── widgets/      # Alert banners, stats modules, link cards
│   ├── constants/        # Navigation configurations, default layout states, mock seeds
│   ├── context/          # Global state (Metrics feed, Layouts, App Navigation, Alerts)
│   ├── hooks/            # Custom hooks (Terminal execution, Container actions, LocalStorage storage)
│   ├── modules/          # Core module features (Dashboard, Containers, Analytics, Terminal)
│   ├── types/            # TypeScript interface definitions
│   ├── App.tsx           # Application entrypoint
│   └── main.tsx          # React client rendering and context providers
```

---

## 🚀 Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine. We recommend using `pnpm` or `npm`.

### Installation

1. Clone this repository to your local system:
   ```bash
   git clone https://github.com/SaMoBTW/HomeLab-Dashboard.git
   cd HomeLab-Dashboard
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```

5. Run code quality checks:
   ```bash
   npm run lint
   ```
